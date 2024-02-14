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
import type { CreateSmsCampaignRecipients } from './CreateSmsCampaignRecipients.js';
import {
    CreateSmsCampaignRecipientsFromJSON,
    CreateSmsCampaignRecipientsFromJSONTyped,
    CreateSmsCampaignRecipientsToJSON,
} from './CreateSmsCampaignRecipients.js';

/**
 * 
 * @export
 * @interface UpdateSmsCampaign
 */
export interface UpdateSmsCampaign {
    /**
     * Name of the campaign
     * @type {string}
     * @memberof UpdateSmsCampaign
     */
    name?: string;
    /**
     * Name of the sender. **The number of characters is limited to 11 for alphanumeric characters and 15 for numeric characters**
     * @type {string}
     * @memberof UpdateSmsCampaign
     */
    sender?: string;
    /**
     * Content of the message. The maximum characters used per SMS is 160, if used more than that, it will be counted as more than one SMS
     * @type {string}
     * @memberof UpdateSmsCampaign
     */
    content?: string;
    /**
     * 
     * @type {CreateSmsCampaignRecipients}
     * @memberof UpdateSmsCampaign
     */
    recipients?: CreateSmsCampaignRecipients;
    /**
     * UTC date-time on which the campaign has to run (YYYY-MM-DDTHH:mm:ss.SSSZ). Prefer to pass your timezone in date-time format for accurate result.
     * @type {Date}
     * @memberof UpdateSmsCampaign
     */
    scheduledAt?: Date;
}

/**
 * Check if a given object implements the UpdateSmsCampaign interface.
 */
export function instanceOfUpdateSmsCampaign(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateSmsCampaignFromJSON(json: any): UpdateSmsCampaign {
    return UpdateSmsCampaignFromJSONTyped(json, false);
}

export function UpdateSmsCampaignFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateSmsCampaign {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'sender': !exists(json, 'sender') ? undefined : json['sender'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'recipients': !exists(json, 'recipients') ? undefined : CreateSmsCampaignRecipientsFromJSON(json['recipients']),
        'scheduledAt': !exists(json, 'scheduledAt') ? undefined : (new Date(json['scheduledAt'])),
    };
}

export function UpdateSmsCampaignToJSON(value?: UpdateSmsCampaign | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'sender': value.sender,
        'content': value.content,
        'recipients': CreateSmsCampaignRecipientsToJSON(value.recipients),
        'scheduledAt': value.scheduledAt === undefined ? undefined : (value.scheduledAt.toISOString()),
    };
}

