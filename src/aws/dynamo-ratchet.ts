/*
    Helper functions for DynamoDB
*/

import AWS, { AWSError } from 'aws-sdk';
import { Logger } from '../common/logger';
import { PromiseResult } from 'aws-sdk/lib/request';
import { DurationRatchet } from '../common/duration-ratchet';
import {
  BatchGetItemInput,
  BatchGetItemOutput,
  BatchWriteItemInput,
  BatchWriteItemOutput,
  DeleteItemInput,
  DeleteItemOutput,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  GetItemOutput,
  PutItemInput,
  QueryInput,
  QueryOutput,
  ScanInput,
  ScanOutput,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { DynamoCountResult } from './model/dynamo-count-result';
import { PromiseRatchet } from '../common/promise-ratchet';
import { Object } from 'aws-sdk/clients/s3';
import { NumberRatchet } from '../common/number-ratchet';
import { ErrorRatchet } from '../common/error-ratchet';
import { RequireRatchet } from '../common/require-ratchet';
import PutItemOutput = DocumentClient.PutItemOutput;
import GetItemInput = DocumentClient.GetItemInput;
import { DynamoRatchetLike } from './dynamo-ratchet-like';

export class DynamoRatchet implements DynamoRatchetLike {
  constructor(private awsDDB: AWS.DynamoDB.DocumentClient) {
    if (!awsDDB) {
      throw 'awsDDB may not be null';
    }
  }

  public getDDB(): AWS.DynamoDB.DocumentClient {
    return this.awsDDB;
  }

  public async tableIsEmpty(tableName: string): Promise<boolean> {
    const scan: ScanInput = {
      TableName: tableName,
      Limit: 1,
    };

    const scanOutput: ScanOutput = await this.throughputSafeScanOrQuery<ScanInput, ScanOutput>((o) => this.scanPromise(o), scan);
    return scanOutput.Items.length === 0;
  }

  // A little pass-thru to simplify passing around this function
  public async scanPromise(input: ScanInput): Promise<ScanOutput> {
    return this.awsDDB.scan(input).promise();
  }

  // A little pass-thru to simplify passing around this function
  public async queryPromise(input: QueryInput): Promise<QueryOutput> {
    return this.awsDDB.query(input).promise();
  }

  // This basically wraps up scans and queries with a function that will auto-retry them if a
  // Throughput exception is encountered (up to a limit) but lets other errors get thrown.
  // Drop-in replacement to make sure that things do not fail just because of throughput issues
  public async throughputSafeScanOrQuery<T, R>(proc: (T) => Promise<R>, input: T, maxTries?: number, inCurrentTry?: number): Promise<R> {
    let rval: R = null;
    if (input) {
      let currentTry: number = inCurrentTry ?? 0;
      do {
        currentTry++;
        try {
          rval = await proc(input);
        } catch (err) {
          if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
            const wait: number = Math.pow(2, currentTry) * 1000;
            Logger.debug('Exceeded scan throughput for %j : Try %d of %d (Waiting %d ms)', input, currentTry, maxTries, wait);
            await PromiseRatchet.wait(wait);
            currentTry++;
          } else {
            throw err; // We only catch throughput issues
          }
        }
      } while (!rval && (!maxTries || currentTry < maxTries));
      if (!rval) {
        // We got here because we ran out of tries
        ErrorRatchet.throwFormattedErr(
          'throughputSafeScan failed - tried %d times, kept running into throughput exceeded : %j',
          maxTries,
          input
        );
      }
    }
    return rval;
  }

  public async fullyExecuteQueryCount(qry: QueryInput, delayMS = 0): Promise<DynamoCountResult> {
    try {
      qry.Select = 'COUNT'; // Force it to be a count query
      Logger.debug('Executing count query : %j', qry);

      const rval: DynamoCountResult = {
        count: 0,
        scannedCount: 0,
        pages: 0,
      };

      const start: number = new Date().getTime();
      let qryResults: PromiseResult<any, any> = null;

      const myLimit: number = qry.Limit;
      qry.Limit = null;

      do {
        qryResults = await this.throughputSafeScanOrQuery<QueryInput, QueryOutput>((o) => this.queryPromise(o), qry);
        rval.count += qryResults['Count'];
        rval.scannedCount += qryResults['ScannedCount'];
        rval.pages++;
        qry['ExclusiveStartKey'] = qryResults.LastEvaluatedKey;
        await PromiseRatchet.wait(delayMS);
        Logger.silly('Rval is now %j', rval);
        if (myLimit && rval.count >= myLimit && qry['ExclusiveStartKey']) {
          Logger.info('Aborting query since hit limit of %d', myLimit);
          qry['ExclusiveStartKey'] = null;
        }
      } while (qry['ExclusiveStartKey']);

      const end: number = new Date().getTime();

      Logger.debug('Finished, returned %j in %s for %j', rval, DurationRatchet.formatMsDuration(end - start, true), qry);
      return rval;
    } catch (err) {
      Logger.error('Failed with %s, q: %j', err, qry, err);
      return null;
    }
  }

  public async fullyExecuteQuery<T>(qry: QueryInput, delayMS = 0, softLimit: number = null): Promise<T[]> {
    const rval: T[] = [];
    await this.fullyExecuteProcessOverQuery<T>(
      qry,
      async (v) => {
        rval.push(v);
      },
      delayMS,
      softLimit
    );
    return rval;
  }

  public async fullyExecuteProcessOverQuery<T>(
    qry: QueryInput,
    proc: (val: T) => Promise<void>,
    delayMS = 0,
    softLimit: number = null
  ): Promise<number> {
    let cnt: number = 0;
    try {
      Logger.debug('Executing query : %j', qry);
      const start: number = new Date().getTime();
      Logger.debug('Pulling %j', qry);

      let qryResults: QueryOutput = await this.throughputSafeScanOrQuery<QueryInput, QueryOutput>((o) => this.queryPromise(o), qry);
      for (let i = 0; i < qryResults.Items.length; i++) {
        await proc(qryResults.Items[i] as unknown as T);
        cnt++;
      }

      let pages = 0;
      let blankPages = 0;

      while (qryResults.LastEvaluatedKey && (softLimit === null || cnt < softLimit) && !qry.Limit) {
        // If Limit was set on the initial query, stop after 1
        Logger.silly('Found more rows - requery with key %j', qryResults.LastEvaluatedKey);
        qry['ExclusiveStartKey'] = qryResults.LastEvaluatedKey;
        qryResults = await this.throughputSafeScanOrQuery<QueryInput, QueryOutput>((o) => this.queryPromise(o), qry);
        for (let i = 0; i < qryResults.Items.length; i++) {
          await proc(qryResults.Items[i] as unknown as T);
          cnt++;
        }
        Logger.silly('Have processed %d items', cnt);
        pages++;
        blankPages += qryResults.Count === 0 ? 1 : 0;
        await PromiseRatchet.wait(delayMS);
      }

      const end: number = new Date().getTime();

      Logger.debug(
        'Finished, processed %d rows in %s for %j (%d blank pages, %d total pages)',
        cnt,
        DurationRatchet.formatMsDuration(end - start, true),
        qry,
        blankPages,
        pages
      );
    } catch (err) {
      Logger.error('Failed with %s, q: %j', err, qry, err);
    }
    return cnt;
  }

  public async fullyExecuteScanCount(scan: ScanInput, delayMS = 0): Promise<DynamoCountResult> {
    try {
      scan.Select = 'COUNT'; // Force it to be a count query
      const rval: DynamoCountResult = {
        count: 0,
        scannedCount: 0,
        pages: 0,
      };

      Logger.debug('Executing scan count : %j', scan);
      const start: number = new Date().getTime();

      let qryResults: PromiseResult<any, any> = null;

      const myLimit: number = scan.Limit;
      scan.Limit = null;

      do {
        qryResults = await this.throughputSafeScanOrQuery<ScanInput, ScanOutput>((o) => this.scanPromise(o), scan);
        rval.count += qryResults['Count'];
        rval.scannedCount += qryResults['ScannedCount'];
        rval.pages++;
        scan['ExclusiveStartKey'] = qryResults?.LastEvaluatedKey;
        await PromiseRatchet.wait(delayMS);
        Logger.silly('Rval is now %j', rval);
        if (myLimit && rval.count >= myLimit && scan['ExclusiveStartKey']) {
          Logger.info('Aborting scan since hit limit of %d', myLimit);
          scan['ExclusiveStartKey'] = null;
        }
      } while (scan['ExclusiveStartKey']);

      const end: number = new Date().getTime();

      Logger.debug('Finished, returned %j in %s for %j', rval, DurationRatchet.formatMsDuration(end - start, true), scan);
      return rval;
    } catch (err) {
      Logger.error('Failed with %s, q: %j', err, scan, err);
      return null;
    }
  }

  public async fullyExecuteScan<T>(scan: ScanInput, delayMS = 0, softLimit: number = null): Promise<T[]> {
    const rval: T[] = [];
    await this.fullyExecuteProcessOverScan<T>(
      scan,
      async (v) => {
        rval.push(v);
      },
      delayMS,
      softLimit
    );
    return rval;
  }

  public async fullyExecuteProcessOverScan<T>(
    scan: ScanInput,
    proc: (val: T) => Promise<void>,
    delayMS = 0,
    softLimit: number = null
  ): Promise<number> {
    let cnt: number = 0;
    try {
      Logger.debug('Executing scan : %j', scan);
      const start: number = new Date().getTime();

      Logger.debug('Pulling %j', scan);

      let qryResults: PromiseResult<any, any> = await this.throughputSafeScanOrQuery<ScanInput, ScanOutput>(
        (o) => this.scanPromise(o),
        scan
      );
      for (let i = 0; i < qryResults.Items.length; i++) {
        await proc(qryResults.Items[i] as unknown as T);
        cnt++;
      }

      while (qryResults.LastEvaluatedKey && (softLimit === null || cnt < softLimit) && !scan.Limit) {
        Logger.silly('Found more rows - requery with key %j', qryResults.LastEvaluatedKey);
        scan['ExclusiveStartKey'] = qryResults.LastEvaluatedKey;
        qryResults = await this.throughputSafeScanOrQuery<ScanInput, ScanOutput>((o) => this.scanPromise(o), scan);
        for (let i = 0; i < qryResults.Items.length; i++) {
          await proc(qryResults.Items[i] as unknown as T);
          cnt++;
        }
        Logger.silly('Rval is now %d items', cnt);
        await PromiseRatchet.wait(delayMS);
      }

      const end: number = new Date().getTime();

      Logger.debug('Finished, processed %d results in %s for %j', cnt, DurationRatchet.formatMsDuration(end - start, true), scan);
    } catch (err) {
      Logger.error('Failed with %s, q: %j', err, scan, err);
    }
    return cnt;
  }

  public async writeAllInBatches<T>(tableName: string, elements: T[], batchSize: number): Promise<number> {
    if (!batchSize || batchSize < 2) {
      throw new Error('Batch size needs to be at least 2, was ' + batchSize);
    }

    let rval = 0;
    if (!!elements && elements.length > 0) {
      let batchItems: any[] = [];
      elements.forEach((el) => {
        batchItems.push({
          PutRequest: {
            Item: el,
            ReturnConsumedCapacity: 'TOTAL',
            TableName: tableName,
          },
        });
      });
      Logger.debug('Processing %d batch items to %s', batchItems.length, tableName);

      while (batchItems.length > 0) {
        const curBatch: any[] = batchItems.slice(0, Math.min(batchItems.length, batchSize));
        batchItems = batchItems.slice(curBatch.length);
        const params: BatchWriteItemInput = {
          RequestItems: {},
          ReturnConsumedCapacity: 'TOTAL',
          ReturnItemCollectionMetrics: 'SIZE',
        };
        params.RequestItems[tableName] = curBatch;

        let tryCount = 1;
        let done = false;
        let batchResults: BatchWriteItemOutput = null;
        while (!done && tryCount < 7) {
          try {
            batchResults = await this.awsDDB.batchWrite(params).promise();
          } catch (err) {
            if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
              Logger.info('Caught ProvisionedThroughputExceededException - retrying delete');
              batchResults = { UnprocessedItems: params.RequestItems }; // Just retry everything
            } else {
              throw err; // We only retry on throughput
            }
          }
          if (
            !!batchResults &&
            !!batchResults.UnprocessedItems &&
            !!batchResults.UnprocessedItems[tableName] &&
            batchResults.UnprocessedItems[tableName].length > 0
          ) {
            const backoff: number = Math.pow(2, tryCount); // Backoff 2,4,8,16,32 seconds to allow capacity recovery
            Logger.warn(
              'Found %d unprocessed items.  Backing off %d seconds and trying again',
              batchResults.UnprocessedItems[tableName].length,
              backoff
            );
            await PromiseRatchet.wait(backoff * 1000);
            tryCount++;
            params.RequestItems[tableName] = batchResults.UnprocessedItems[tableName];
          } else {
            done = true;
          }
        }
        if (
          !!batchResults &&
          !!batchResults.UnprocessedItems &&
          !!batchResults.UnprocessedItems[tableName] &&
          batchResults.UnprocessedItems[tableName].length > 0
        ) {
          Logger.error('After 6 tries there were still %d unprocessed items');
          rval += curBatch.length - batchResults.UnprocessedItems[tableName].length;
          Logger.warn('FIX Unprocessed : %j', batchResults.UnprocessedItems);
        } else {
          rval += curBatch.length;
        }
      }
    }
    return rval;
  }

  public async fetchFullObjectsMatchingKeysOnlyIndexQuery<T>(qry: QueryInput, keyNames: string[], batchSize: number = 25): Promise<T[]> {
    RequireRatchet.notNullOrUndefined(qry);
    RequireRatchet.notNullOrUndefined(qry.TableName);
    RequireRatchet.notNullOrUndefined(keyNames);
    RequireRatchet.true(keyNames.length > 0);

    const keyDataSrc: any[] = await this.fullyExecuteQuery<any>(qry);
    const keysOnly: any[] = DynamoRatchet.stripAllToKeysOnly(keyDataSrc, keyNames);
    const rval: T[] = await this.fetchAllInBatches<T>(qry.TableName, keysOnly, batchSize);
    return rval;
  }

  public async fetchAllInBatches<T>(tableName: string, inKeys: any[], batchSize: number): Promise<T[]> {
    if (!batchSize || batchSize < 2 || batchSize > 100) {
      throw new Error('Batch size needs to be at least 2 and no more than 100, was ' + batchSize);
    }

    let rval: T[] = [];
    const batches: BatchGetItemInput[] = [];
    let remain: any[][] = Object.assign([], inKeys);
    while (remain.length > 0) {
      const curBatch: any[] = remain.slice(0, Math.min(remain.length, batchSize));
      remain = remain.slice(curBatch.length);
      const tableEntry: any = {};
      tableEntry[tableName] = {
        Keys: curBatch,
      };
      const nextBatch: BatchGetItemInput = {
        RequestItems: tableEntry,
        ReturnConsumedCapacity: 'TOTAL',
      };
      batches.push(nextBatch);
    }
    Logger.debug('Created %d batches', batches.length);

    for (let i = 0; i < batches.length; i++) {
      // No need to log batch count if there's only one.
      if (batches.length > 1) {
        Logger.info('Processing batch %d of %d', i + 1, batches.length);
      }
      const input: BatchGetItemInput = batches[i];
      let tryCount: number = 1;
      do {
        Logger.silly('Pulling %j', input);
        const res: BatchGetItemOutput = await this.awsDDB.batchGet(input).promise();

        // Copy in all the data
        rval = rval.concat(res.Responses[tableName] as unknown as T[]);

        // Retry anything we missed
        if (!!res.UnprocessedKeys && !!res.UnprocessedKeys[tableName] && res.UnprocessedKeys[tableName].Keys.length > 0 && tryCount < 15) {
          Logger.silly('Found %d unprocessed, waiting', res.UnprocessedKeys[tableName].Keys);
          await PromiseRatchet.wait(Math.pow(2, tryCount) * 1000);
          tryCount++;
        }
        input.RequestItems = res.UnprocessedKeys;
      } while (!input.RequestItems && input.RequestItems[tableName].Keys.length > 0);
    }
    return rval;
  }

  public async deleteAllInBatches(tableName: string, keys: any[], batchSize: number): Promise<number> {
    if (!batchSize || batchSize < 2) {
      throw new Error('Batch size needs to be at least 2, was ' + batchSize);
    }

    let rval = 0;
    if (!!keys && keys.length > 0) {
      let batchItems: any[] = [];
      keys.forEach((el) => {
        batchItems.push({
          DeleteRequest: {
            Key: el,
            ReturnConsumedCapacity: 'TOTAL',
            TableName: tableName,
          },
        });
      });
      Logger.debug('Processing %d DeleteBatch items to %s', batchItems.length, tableName);

      while (batchItems.length > 0) {
        const curBatch: any[] = batchItems.slice(0, Math.min(batchItems.length, batchSize));
        batchItems = batchItems.slice(curBatch.length);
        const params: BatchWriteItemInput = {
          RequestItems: {},
          ReturnConsumedCapacity: 'TOTAL',
          ReturnItemCollectionMetrics: 'SIZE',
        };
        params.RequestItems[tableName] = curBatch;

        let tryCount = 1;
        let done = false;
        let batchResults: BatchWriteItemOutput = null;
        while (!done && tryCount < 7) {
          try {
            batchResults = await this.awsDDB.batchWrite(params).promise();
          } catch (err) {
            if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
              Logger.info('Caught ProvisionedThroughputExceededException - retrying delete');
              batchResults = { UnprocessedItems: params.RequestItems }; // Just retry everything
            } else {
              throw err; // We only retry on throughput
            }
          }
          if (
            !!batchResults &&
            !!batchResults.UnprocessedItems &&
            !!batchResults.UnprocessedItems[tableName] &&
            batchResults.UnprocessedItems[tableName].length > 0
          ) {
            const backoff: number = Math.pow(2, tryCount); // Backoff 2,4,8,16,32 seconds to allow capacity recovery
            Logger.warn(
              'Found %d unprocessed items.  Backing off %d seconds and trying again',
              batchResults.UnprocessedItems[tableName].length,
              backoff
            );
            await PromiseRatchet.wait(backoff * 1000);
            tryCount++;
            params.RequestItems[tableName] = batchResults.UnprocessedItems[tableName];
          } else {
            done = true;
          }
        }
        if (
          !!batchResults &&
          !!batchResults.UnprocessedItems &&
          !!batchResults.UnprocessedItems[tableName] &&
          batchResults.UnprocessedItems[tableName].length > 0
        ) {
          Logger.error('After 6 tries there were still %d unprocessed items');
          rval += curBatch.length - batchResults.UnprocessedItems[tableName].length;
          Logger.warn('FIX Unprocessed : %j', batchResults.UnprocessedItems);
        } else {
          rval += curBatch.length;
        }

        Logger.debug('%d Remain, DeleteBatch Results : %j', batchItems.length, batchResults);
      }
    }
    return rval;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async simplePut(tableName: string, value: any, autoRetryCount: number = 3): Promise<PutItemOutput> {
    let rval: PutItemOutput = null;
    let currentTry: number = 0;

    const params: PutItemInput = {
      Item: value,
      ReturnConsumedCapacity: 'TOTAL',
      TableName: tableName,
    };

    while (!rval && currentTry < autoRetryCount) {
      try {
        rval = await this.awsDDB.put(params).promise();
      } catch (err) {
        if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
          const wait: number = Math.pow(2, currentTry) * 1000;
          Logger.debug('Exceeded write throughput for %j : Try %d of %d (Waiting %d ms)', params, currentTry, autoRetryCount, wait);
          await PromiseRatchet.wait(wait);
          currentTry++;
        } else {
          throw err; // We only catch throughput issues
        }
      }
    }
    if (!rval) {
      Logger.warn('Unable to write %j to DDB after %d tries, giving up', params, autoRetryCount);
    }
    return rval;
  }

  public async simplePutOnlyIfFieldIsNullOrUndefined(tableName: string, value: any, fieldName: string): Promise<boolean> {
    let rval: boolean = false;
    const params: PutItemInput = {
      Item: value as any,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'attribute_not_exists(#fieldName) OR #fieldName = :null ',
      ExpressionAttributeNames: {
        '#fieldName': fieldName,
      } as ExpressionAttributeNameMap,
      ExpressionAttributeValues: {
        ':null': null,
      } as ExpressionAttributeValueMap,
      TableName: tableName,
    };
    try {
      const wrote: PutItemOutput = await this.awsDDB.put(params).promise();
      Logger.silly('Wrote : %j', wrote);
      rval = true;
    } catch (err) {
      if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
        // Infinite retry - probably not smart
        Logger.debug('Exceeded write throughput for %j : (Waiting 2000 ms)', params);
        await PromiseRatchet.wait(2000);
      } else if (err && err['code'] && err['code'] === 'ConditionalCheckFailedException') {
        Logger.debug('Failed to write %j due to null field failure', value);
        rval = false;
      } else {
        throw err; // We only catch throughput issues
      }
    }
    return rval;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // This works like simplePut, but if a collision is detected it adjusts the object and tries writing again
  // The adjustment function MUST change one of the keys - otherwise this just runs forever (or until it hits "maxAdjusts")
  public async simplePutWithCollisionAvoidance<T>(
    tableName: string,
    value: T,
    keyNames: string[],
    adjustFunction: (val: T) => T,
    maxAdjusts: number = null,
    autoRetryCount: number = 3
  ): Promise<T> {
    RequireRatchet.true(keyNames && keyNames.length > 0 && keyNames.length < 3, 'You must pass 1 or 2 key names');
    let pio: PutItemOutput = null;
    let currentTry: number = 0;

    const attrNames: ExpressionAttributeNameMap = {
      '#key0': keyNames[0],
    };
    const attrValues: ExpressionAttributeValueMap = {
      ':key0': value[keyNames[0]],
    };

    let condExp: string = '#key0 <> :key0';
    if (keyNames.length > 1) {
      condExp += ' AND #key1 <> :key1';
      attrNames['#key1'] = keyNames[1];
      attrValues[':key1'] = value[keyNames[1]];
    }

    const params: PutItemInput = {
      Item: value as any,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: condExp,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
      TableName: tableName,
    };

    let adjustCount: number = 0;
    while (!pio && currentTry < autoRetryCount && (!maxAdjusts || adjustCount < maxAdjusts)) {
      try {
        pio = await this.awsDDB.put(params).promise();
      } catch (err) {
        if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
          currentTry++;
          const wait: number = Math.pow(2, currentTry) * 1000;
          Logger.debug('Exceeded write throughput for %j : Try %d of %d (Waiting %d ms)', params, currentTry, autoRetryCount, wait);
          await PromiseRatchet.wait(wait);
        } else if (err && err['code'] && err['code'] === 'ConditionalCheckFailedException') {
          let newValue: T = Object.assign({}, params.Item as unknown) as T;
          Logger.info('Failed to write %j due to collision - adjusting and retrying', newValue);
          newValue = adjustFunction(newValue);
          params.Item = newValue as any;
          params.ExpressionAttributeValues[':key0'] = newValue[keyNames[0]];
          if (keyNames.length > 1) {
            params.ExpressionAttributeValues[':key1'] = newValue[keyNames[1]];
          }
          adjustCount++;
        } else {
          throw err; // We only catch throughput issues
        }
      }
    }
    if (pio && adjustCount > 0) {
      Logger.info('After adjustment, wrote %j as %j', value, params.Item);
    }

    if (!pio) {
      Logger.warn('Unable to write %j to DDB after %d provision tries and %d adjusts, giving up', params, currentTry, adjustCount);
    }

    return pio ? (params.Item as unknown as T) : null;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async simpleGet<T>(tableName: string, keys: any, autoRetryCount: number = 3): Promise<T> {
    let holder: GetItemOutput = null;
    let currentTry: number = 0;

    const params: GetItemInput = {
      TableName: tableName,
      Key: keys,
    };

    while (!holder && currentTry < autoRetryCount) {
      try {
        holder = await this.awsDDB.get(params).promise();
      } catch (err) {
        if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
          const wait: number = Math.pow(2, currentTry) * 1000;
          Logger.debug('Exceeded read throughput for %j : Try %d of %d (Waiting %d ms)', params, currentTry, autoRetryCount, wait);
          await PromiseRatchet.wait(wait);
          currentTry++;
        } else {
          throw err; // We only catch throughput issues
        }
      }
    }
    if (!holder) {
      Logger.warn('Unable to read %j from DDB after %d tries, giving up', params, autoRetryCount);
    }
    const rval: T = !!holder && !!holder.Item ? Object.assign({} as T, holder.Item) : null;
    return rval;
  }

  public static objectIsErrorWithProvisionedThroughputExceededExceptionCode(err: any): boolean {
    return !!err && !!err['code'] && err['code'] === 'ProvisionedThroughputExceededException';
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async simpleGetWithCounterDecrement<T>(
    tableName: string,
    keys: any,
    counterAttributeName: string,
    deleteOnZero: boolean,
    autoRetryCount: number = 3
  ): Promise<T> {
    let holder: UpdateItemOutput = null;
    let currentTry: number = 0;

    const params: UpdateItemInput = {
      TableName: tableName,
      Key: keys,
      UpdateExpression: 'set #counter = #counter-:decVal',
      ExpressionAttributeNames: {
        '#counter': counterAttributeName,
      } as ExpressionAttributeNameMap,
      ExpressionAttributeValues: {
        ':decVal': 1,
        ':minVal': 0,
      } as ExpressionAttributeValueMap,
      ConditionExpression: '#counter > :minVal',
      ReturnValues: 'ALL_NEW',
    };

    let updateFailed: boolean = false;
    while (!holder && currentTry < autoRetryCount && !updateFailed) {
      try {
        holder = await this.awsDDB.update(params).promise();
      } catch (err) {
        if (DynamoRatchet.objectIsErrorWithProvisionedThroughputExceededExceptionCode(err)) {
          const wait: number = Math.pow(2, currentTry) * 1000;
          Logger.debug('Exceeded update throughput for %j : Try %d of %d (Waiting %d ms)', params, currentTry, autoRetryCount, wait);
          await PromiseRatchet.wait(wait);
          currentTry++;
        } else if (!!err && !!err['code'] && err['code'] === 'ConditionalCheckFailedException') {
          Logger.info('Cannot fetch requested row (%j) - the update check failed', keys);
          updateFailed = true;
        } else {
          throw err; // We only catch throughput issues
        }
      }
    }
    if (!holder && !updateFailed) {
      Logger.warn('Unable to update %j from DDB after %d tries, giving up', params, autoRetryCount);
    }

    const rval: T = !!holder && !!holder.Attributes ? Object.assign({} as T, holder.Attributes) : null;

    if (deleteOnZero && rval && rval[counterAttributeName] === 0) {
      Logger.info('Delete on 0 specified, removing');
      await this.simpleDelete(tableName, keys);
    }

    return rval;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async simpleDelete(tableName: string, keys: any): Promise<DeleteItemOutput> {
    const params: DeleteItemInput = {
      TableName: tableName,
      Key: keys,
    };

    const holder: PromiseResult<DeleteItemOutput, AWSError> = await this.awsDDB.delete(params).promise();
    return holder;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async atomicCounter(tableName: string, keys: any, counterFieldName: string, increment = 1): Promise<number> {
    const update: UpdateItemInput = {
      TableName: tableName,
      Key: keys,
      //UpdateExpression: 'SET '+counterFieldName+' = '+counterFieldName+' + :inc',
      UpdateExpression: 'SET #counterFieldName = #counterFieldName + :inc',
      ExpressionAttributeNames: {
        '#counterFieldName': counterFieldName,
      } as ExpressionAttributeNameMap,
      ExpressionAttributeValues: {
        ':inc': increment,
      } as ExpressionAttributeValueMap,
      ReturnValues: 'UPDATED_NEW',
    };

    const ui: UpdateItemOutput = await this.awsDDB.update(update).promise();
    const rval: number = NumberRatchet.safeNumber(ui.Attributes[counterFieldName]);
    return rval;
  }

  // Recursively Removes any empty strings in place
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static cleanObject(ob: any): void {
    if (!!ob) {
      const rem: string[] = [];
      Object.keys(ob).forEach((k) => {
        const v: any = ob[k];
        if (v === '') {
          rem.push(k);
        } else if (v instanceof Object) {
          DynamoRatchet.cleanObject(v);
        }
      });
      Logger.silly('Removing keys : %j', rem);
      rem.forEach((k) => {
        delete ob[k];
      });
    }
  }

  // Given an object, deletes anything that isnt part of the key
  public static stripToKeysOnly(input: any, keys: string[]): any {
    let rval: any = null;
    if (!!input && !!keys && keys.length > 0) {
      rval = {};
      keys.forEach((k) => {
        if (!input[k]) {
          ErrorRatchet.throwFormattedErr('Failed key extraction on %j - missing %s', input, k);
        }
        rval[k] = input[k];
      });
    }
    return rval;
  }

  public static stripAllToKeysOnly(input: any[], keys: string[]): any[] {
    const rval: any[] = input.map((i) => DynamoRatchet.stripToKeysOnly(i, keys));
    return rval;
  }
}
