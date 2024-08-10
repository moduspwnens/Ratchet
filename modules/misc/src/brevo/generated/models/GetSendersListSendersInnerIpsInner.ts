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
 * @interface GetSendersListSendersInnerIpsInner
 */
export interface GetSendersListSendersInnerIpsInner {
    /**
     * Dedicated IP available in your account
     * @type {string}
     * @memberof GetSendersListSendersInnerIpsInner
     */
    ip: string;
    /**
     * Domain of the IP
     * @type {string}
     * @memberof GetSendersListSendersInnerIpsInner
     */
    domain: string;
    /**
     * Weight of the IP for this sender
     * @type {number}
     * @memberof GetSendersListSendersInnerIpsInner
     */
    weight: number;
}

/**
 * Check if a given object implements the GetSendersListSendersInnerIpsInner interface.
 */
export function instanceOfGetSendersListSendersInnerIpsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ip" in value;
    isInstance = isInstance && "domain" in value;
    isInstance = isInstance && "weight" in value;

    return isInstance;
}

export function GetSendersListSendersInnerIpsInnerFromJSON(json: any): GetSendersListSendersInnerIpsInner {
    return GetSendersListSendersInnerIpsInnerFromJSONTyped(json, false);
}

export function GetSendersListSendersInnerIpsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetSendersListSendersInnerIpsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ip': json['ip'],
        'domain': json['domain'],
        'weight': json['weight'],
    };
}

export function GetSendersListSendersInnerIpsInnerToJSON(value?: GetSendersListSendersInnerIpsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ip': value.ip,
        'domain': value.domain,
        'weight': value.weight,
    };
}

