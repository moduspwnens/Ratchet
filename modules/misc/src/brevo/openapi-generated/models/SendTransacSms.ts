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
 * @interface SendTransacSms
 */
export interface SendTransacSms {
    /**
     * Name of the sender. **The number of characters is limited to 11 for alphanumeric characters and 15 for numeric characters**
     * @type {string}
     * @memberof SendTransacSms
     */
    sender: string;
    /**
     * Mobile number to send SMS with the country code
     * @type {string}
     * @memberof SendTransacSms
     */
    recipient: string;
    /**
     * Content of the message. If more than 160 characters long, will be sent as multiple text messages
     * @type {string}
     * @memberof SendTransacSms
     */
    content: string;
    /**
     * Type of the SMS. Marketing SMS messages are those sent typically with marketing content. Transactional SMS messages are sent to individuals and are triggered in response to some action, such as a sign-up, purchase, etc.
     * @type {string}
     * @memberof SendTransacSms
     */
    type?: SendTransacSmsTypeEnum;
    /**
     * Tag of the message
     * @type {string}
     * @memberof SendTransacSms
     */
    tag?: string;
    /**
     * Webhook to call for each event triggered by the message (delivered etc.)
     * @type {string}
     * @memberof SendTransacSms
     */
    webUrl?: string;
    /**
     * A recognizable prefix will ensure your audience knows who you are.**Mandatory for U.S. Carriers**.This will be added as your Brand Name before the message content and will be included in content,**Prefer to verify maximum length of 160 characters including this prefix to avoid multiple sending of same sms**.
     * @type {string}
     * @memberof SendTransacSms
     */
    organisationPrefix?: string;
}

/**
* @export
* @enum {string}
*/
export enum SendTransacSmsTypeEnum {
    Transactional = 'transactional',
    Marketing = 'marketing'
}


/**
 * Check if a given object implements the SendTransacSms interface.
 */
export function instanceOfSendTransacSms(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "sender" in value;
    isInstance = isInstance && "recipient" in value;
    isInstance = isInstance && "content" in value;

    return isInstance;
}

export function SendTransacSmsFromJSON(json: any): SendTransacSms {
    return SendTransacSmsFromJSONTyped(json, false);
}

export function SendTransacSmsFromJSONTyped(json: any, ignoreDiscriminator: boolean): SendTransacSms {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sender': json['sender'],
        'recipient': json['recipient'],
        'content': json['content'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'tag': !exists(json, 'tag') ? undefined : json['tag'],
        'webUrl': !exists(json, 'webUrl') ? undefined : json['webUrl'],
        'organisationPrefix': !exists(json, 'organisationPrefix') ? undefined : json['organisationPrefix'],
    };
}

export function SendTransacSmsToJSON(value?: SendTransacSms | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sender': value.sender,
        'recipient': value.recipient,
        'content': value.content,
        'type': value.type,
        'tag': value.tag,
        'webUrl': value.webUrl,
        'organisationPrefix': value.organisationPrefix,
    };
}

