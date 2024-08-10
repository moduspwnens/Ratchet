/* eslint-disable */
/**
 * SendinBlue API
 * SendinBlue provide a RESTFul API that can be used with any languages. With this API, you will be able to :   - Manage your campaigns and get the statistics   - Manage your contacts   - Send transactional Emails and SMS   - and much more...  You can download our wrappers at https://github.com/orgs/sendinblue  **Possible responses**   | Code | Message |   | :-------------: | ------------- |   | 200  | OK. Successful Request  |   | 201  | OK. Successful Creation |   | 202  | OK. Request accepted |   | 204  | OK. Successful Update/Deletion  |   | 400  | Error. Bad Request  |   | 401  | Error. Authentication Needed  |   | 402  | Error. Not enough credit, plan upgrade needed  |   | 403  | Error. Permission denied  |   | 404  | Error. Object does not exist |   | 405  | Error. Method not allowed  |   | 406  | Error. Not Acceptable  | 
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: contact@sendinblue.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime.js';
/**
 * 
 * @export
 * @interface GetList
 */
export interface GetList {
    /**
     * ID of the list
     * @type {number}
     * @memberof GetList
     */
    id: number;
    /**
     * Name of the list
     * @type {string}
     * @memberof GetList
     */
    name: string;
    /**
     * Number of blacklisted contacts in the list
     * @type {number}
     * @memberof GetList
     */
    totalBlacklisted: number;
    /**
     * Number of contacts in the list
     * @type {number}
     * @memberof GetList
     */
    totalSubscribers: number;
}

/**
 * Check if a given object implements the GetList interface.
 */
export function instanceOfGetList(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "totalBlacklisted" in value;
    isInstance = isInstance && "totalSubscribers" in value;

    return isInstance;
}

export function GetListFromJSON(json: any): GetList {
    return GetListFromJSONTyped(json, false);
}

export function GetListFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'totalBlacklisted': json['totalBlacklisted'],
        'totalSubscribers': json['totalSubscribers'],
    };
}

export function GetListToJSON(value?: GetList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'totalBlacklisted': value.totalBlacklisted,
        'totalSubscribers': value.totalSubscribers,
    };
}

