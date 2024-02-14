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
import type { GetCampaignRecipients } from './GetCampaignRecipients.js';
import {
    GetCampaignRecipientsFromJSON,
    GetCampaignRecipientsFromJSONTyped,
    GetCampaignRecipientsToJSON,
} from './GetCampaignRecipients.js';
import type { GetSmsCampaignStats } from './GetSmsCampaignStats.js';
import {
    GetSmsCampaignStatsFromJSON,
    GetSmsCampaignStatsFromJSONTyped,
    GetSmsCampaignStatsToJSON,
} from './GetSmsCampaignStats.js';

/**
 * 
 * @export
 * @interface GetSmsCampaignsCampaignsInner
 */
export interface GetSmsCampaignsCampaignsInner {
    /**
     * ID of the SMS Campaign
     * @type {number}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    id: number;
    /**
     * Name of the SMS Campaign
     * @type {string}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    name: string;
    /**
     * Status of the SMS Campaign
     * @type {string}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    status: GetSmsCampaignsCampaignsInnerStatusEnum;
    /**
     * Content of the SMS Campaign
     * @type {string}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    content: string;
    /**
     * UTC date-time on which SMS campaign is scheduled. Should be in YYYY-MM-DDTHH:mm:ss.SSSZ format
     * @type {Date}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    scheduledAt: Date;
    /**
     * Sender of the SMS Campaign
     * @type {string}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    sender: string;
    /**
     * Creation UTC date-time of the SMS campaign (YYYY-MM-DDTHH:mm:ss.SSSZ)
     * @type {Date}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    createdAt: Date;
    /**
     * UTC date-time of last modification of the SMS campaign (YYYY-MM-DDTHH:mm:ss.SSSZ)
     * @type {Date}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    modifiedAt: Date;
    /**
     * 
     * @type {GetCampaignRecipients}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    recipients: GetCampaignRecipients;
    /**
     * 
     * @type {GetSmsCampaignStats}
     * @memberof GetSmsCampaignsCampaignsInner
     */
    statistics: GetSmsCampaignStats;
}

/**
* @export
* @enum {string}
*/
export enum GetSmsCampaignsCampaignsInnerStatusEnum {
    Draft = 'draft',
    Sent = 'sent',
    Archive = 'archive',
    Queued = 'queued',
    Suspended = 'suspended',
    InProcess = 'inProcess'
}


/**
 * Check if a given object implements the GetSmsCampaignsCampaignsInner interface.
 */
export function instanceOfGetSmsCampaignsCampaignsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "scheduledAt" in value;
    isInstance = isInstance && "sender" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "modifiedAt" in value;
    isInstance = isInstance && "recipients" in value;
    isInstance = isInstance && "statistics" in value;

    return isInstance;
}

export function GetSmsCampaignsCampaignsInnerFromJSON(json: any): GetSmsCampaignsCampaignsInner {
    return GetSmsCampaignsCampaignsInnerFromJSONTyped(json, false);
}

export function GetSmsCampaignsCampaignsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetSmsCampaignsCampaignsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'status': json['status'],
        'content': json['content'],
        'scheduledAt': (new Date(json['scheduledAt'])),
        'sender': json['sender'],
        'createdAt': (new Date(json['createdAt'])),
        'modifiedAt': (new Date(json['modifiedAt'])),
        'recipients': GetCampaignRecipientsFromJSON(json['recipients']),
        'statistics': GetSmsCampaignStatsFromJSON(json['statistics']),
    };
}

export function GetSmsCampaignsCampaignsInnerToJSON(value?: GetSmsCampaignsCampaignsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'status': value.status,
        'content': value.content,
        'scheduledAt': (value.scheduledAt.toISOString()),
        'sender': value.sender,
        'createdAt': (value.createdAt.toISOString()),
        'modifiedAt': (value.modifiedAt.toISOString()),
        'recipients': GetCampaignRecipientsToJSON(value.recipients),
        'statistics': GetSmsCampaignStatsToJSON(value.statistics),
    };
}

