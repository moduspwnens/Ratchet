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
 * @interface EmailExportRecipients
 */
export interface EmailExportRecipients {
    /**
     * Webhook called once the export process is finished. For reference, https://help.sendinblue.com/hc/en-us/articles/360007666479
     * @type {string}
     * @memberof EmailExportRecipients
     */
    notifyURL?: string;
    /**
     * Type of recipients to export for a campaign
     * @type {string}
     * @memberof EmailExportRecipients
     */
    recipientsType: EmailExportRecipientsRecipientsTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum EmailExportRecipientsRecipientsTypeEnum {
    All = 'all',
    NonClickers = 'nonClickers',
    NonOpeners = 'nonOpeners',
    Clickers = 'clickers',
    Openers = 'openers',
    SoftBounces = 'softBounces',
    HardBounces = 'hardBounces',
    Unsubscribed = 'unsubscribed'
}


/**
 * Check if a given object implements the EmailExportRecipients interface.
 */
export function instanceOfEmailExportRecipients(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "recipientsType" in value;

    return isInstance;
}

export function EmailExportRecipientsFromJSON(json: any): EmailExportRecipients {
    return EmailExportRecipientsFromJSONTyped(json, false);
}

export function EmailExportRecipientsFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmailExportRecipients {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'notifyURL': !exists(json, 'notifyURL') ? undefined : json['notifyURL'],
        'recipientsType': json['recipientsType'],
    };
}

export function EmailExportRecipientsToJSON(value?: EmailExportRecipients | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'notifyURL': value.notifyURL,
        'recipientsType': value.recipientsType,
    };
}

