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
 * @interface GetTransacSmsReportReportsInner
 */
export interface GetTransacSmsReportReportsInner {
    /**
     * Date for which statistics are retrieved
     * @type {Date}
     * @memberof GetTransacSmsReportReportsInner
     */
    date: Date;
    /**
     * Number of requests for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    requests: number;
    /**
     * Number of delivered SMS for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    delivered: number;
    /**
     * Number of hardbounces for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    hardBounces: number;
    /**
     * Number of softbounces for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    softBounces: number;
    /**
     * Number of blocked contact for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    blocked: number;
    /**
     * Number of unsubscription for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    unsubscribed: number;
    /**
     * Number of answered SMS for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    replied: number;
    /**
     * Number of accepted for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    accepted: number;
    /**
     * Number of rejected for the date
     * @type {number}
     * @memberof GetTransacSmsReportReportsInner
     */
    rejected: number;
}

/**
 * Check if a given object implements the GetTransacSmsReportReportsInner interface.
 */
export function instanceOfGetTransacSmsReportReportsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "date" in value;
    isInstance = isInstance && "requests" in value;
    isInstance = isInstance && "delivered" in value;
    isInstance = isInstance && "hardBounces" in value;
    isInstance = isInstance && "softBounces" in value;
    isInstance = isInstance && "blocked" in value;
    isInstance = isInstance && "unsubscribed" in value;
    isInstance = isInstance && "replied" in value;
    isInstance = isInstance && "accepted" in value;
    isInstance = isInstance && "rejected" in value;

    return isInstance;
}

export function GetTransacSmsReportReportsInnerFromJSON(json: any): GetTransacSmsReportReportsInner {
    return GetTransacSmsReportReportsInnerFromJSONTyped(json, false);
}

export function GetTransacSmsReportReportsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetTransacSmsReportReportsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': (new Date(json['date'])),
        'requests': json['requests'],
        'delivered': json['delivered'],
        'hardBounces': json['hardBounces'],
        'softBounces': json['softBounces'],
        'blocked': json['blocked'],
        'unsubscribed': json['unsubscribed'],
        'replied': json['replied'],
        'accepted': json['accepted'],
        'rejected': json['rejected'],
    };
}

export function GetTransacSmsReportReportsInnerToJSON(value?: GetTransacSmsReportReportsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': (value.date.toISOString().substring(0,10)),
        'requests': value.requests,
        'delivered': value.delivered,
        'hardBounces': value.hardBounces,
        'softBounces': value.softBounces,
        'blocked': value.blocked,
        'unsubscribed': value.unsubscribed,
        'replied': value.replied,
        'accepted': value.accepted,
        'rejected': value.rejected,
    };
}

