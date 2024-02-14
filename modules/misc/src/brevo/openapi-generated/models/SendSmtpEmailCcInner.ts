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
 * @interface SendSmtpEmailCcInner
 */
export interface SendSmtpEmailCcInner {
    /**
     * Email address of the recipient in cc
     * @type {string}
     * @memberof SendSmtpEmailCcInner
     */
    email: string;
    /**
     * Name of the recipient in cc. Maximum allowed characters are 70.
     * @type {string}
     * @memberof SendSmtpEmailCcInner
     */
    name?: string;
}

/**
 * Check if a given object implements the SendSmtpEmailCcInner interface.
 */
export function instanceOfSendSmtpEmailCcInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;

    return isInstance;
}

export function SendSmtpEmailCcInnerFromJSON(json: any): SendSmtpEmailCcInner {
    return SendSmtpEmailCcInnerFromJSONTyped(json, false);
}

export function SendSmtpEmailCcInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): SendSmtpEmailCcInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function SendSmtpEmailCcInnerToJSON(value?: SendSmtpEmailCcInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'name': value.name,
    };
}

