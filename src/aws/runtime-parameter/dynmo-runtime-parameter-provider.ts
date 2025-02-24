import { ExpressionAttributeValueMap, PutItemOutput, QueryInput } from 'aws-sdk/clients/dynamodb';
import { RuntimeParameterProvider } from './runtime-parameter-provider';
import { StoredRuntimeParameter } from './stored-runtime-parameter';
import { DynamoRatchet } from '../dynamo-ratchet';
import { RequireRatchet } from '../../common/require-ratchet';
import { Logger } from '../../common/logger';

export class DynamoRuntimeParameterProvider implements RuntimeParameterProvider {
  constructor(private dynamo: DynamoRatchet, private tableName: string) {
    RequireRatchet.notNullOrUndefined(this.dynamo);
    RequireRatchet.notNullOrUndefined(this.tableName);
  }

  public async readParameter(groupId: string, paramKey: string): Promise<StoredRuntimeParameter> {
    Logger.silly('Reading %s / %s from underlying db', groupId, paramKey);
    const req: any = {
      groupId: groupId,
      paramKey: paramKey,
    };
    const rval: StoredRuntimeParameter = await this.dynamo.simpleGet<StoredRuntimeParameter>(this.tableName, req);
    return rval;
  }

  public async readAllParametersForGroup(groupId: string): Promise<StoredRuntimeParameter[]> {
    const qry: QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'groupId = :groupId',
      ExpressionAttributeValues: {
        ':groupId': groupId,
      } as ExpressionAttributeValueMap,
    };

    const all: StoredRuntimeParameter[] = await this.dynamo.fullyExecuteQuery<StoredRuntimeParameter>(qry);
    return all;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async writeParameter(toStore: StoredRuntimeParameter): Promise<boolean> {
    const rval: PutItemOutput = await this.dynamo.simplePut(this.tableName, toStore);
    return !!rval;
  }
}
