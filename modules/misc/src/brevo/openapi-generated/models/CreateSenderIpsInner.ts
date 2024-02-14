/* tslint:disable */
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
 * @interface CreateSenderIpsInner
 */
export interface CreateSenderIpsInner {
    /**
     * Dedicated IP available in your account
     * @type {string}
     * @memberof CreateSenderIpsInner
     */
    ip: string;
    /**
     * Domain of the IP
     * @type {string}
     * @memberof CreateSenderIpsInner
     */
    domain: string;
    /**
     * Weight to apply to the IP. Sum of all IP weights must be 100. Should be passed for either ALL or NONE of the IPs. If it's not passed, the sending will be equally balanced on all IPs.
     * @type {number}
     * @memberof CreateSenderIpsInner
     */
    weight?: number;
}

/**
 * Check if a given object implements the CreateSenderIpsInner interface.
 */
export function instanceOfCreateSenderIpsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ip" in value;
    isInstance = isInstance && "domain" in value;

    return isInstance;
}

export function CreateSenderIpsInnerFromJSON(json: any): CreateSenderIpsInner {
    return CreateSenderIpsInnerFromJSONTyped(json, false);
}

export function CreateSenderIpsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSenderIpsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ip': json['ip'],
        'domain': json['domain'],
        'weight': !exists(json, 'weight') ? undefined : json['weight'],
    };
}

export function CreateSenderIpsInnerToJSON(value?: CreateSenderIpsInner | null): any {
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

