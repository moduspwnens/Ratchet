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
 * @interface GetIp
 */
export interface GetIp {
    /**
     * ID of the dedicated IP
     * @type {number}
     * @memberof GetIp
     */
    id: number;
    /**
     * Dedicated IP
     * @type {string}
     * @memberof GetIp
     */
    ip: string;
    /**
     * Status of the IP (true=active, false=inactive)
     * @type {boolean}
     * @memberof GetIp
     */
    active: boolean;
    /**
     * Domain associated to the IP
     * @type {string}
     * @memberof GetIp
     */
    domain: string;
}

/**
 * Check if a given object implements the GetIp interface.
 */
export function instanceOfGetIp(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "ip" in value;
    isInstance = isInstance && "active" in value;
    isInstance = isInstance && "domain" in value;

    return isInstance;
}

export function GetIpFromJSON(json: any): GetIp {
    return GetIpFromJSONTyped(json, false);
}

export function GetIpFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetIp {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'ip': json['ip'],
        'active': json['active'],
        'domain': json['domain'],
    };
}

export function GetIpToJSON(value?: GetIp | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'ip': value.ip,
        'active': value.active,
        'domain': value.domain,
    };
}

