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
 * List ids to include/exclude from campaign
 * @export
 * @interface UpdateEmailCampaignRecipients
 */
export interface UpdateEmailCampaignRecipients {
    /**
     * List ids which have to be excluded from a campaign
     * @type {Array<number>}
     * @memberof UpdateEmailCampaignRecipients
     */
    exclusionListIds?: Array<number>;
    /**
     * Lists Ids to send the campaign to. REQUIRED if already not present in campaign and scheduledAt is not empty
     * @type {Array<number>}
     * @memberof UpdateEmailCampaignRecipients
     */
    listIds?: Array<number>;
}

/**
 * Check if a given object implements the UpdateEmailCampaignRecipients interface.
 */
export function instanceOfUpdateEmailCampaignRecipients(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateEmailCampaignRecipientsFromJSON(json: any): UpdateEmailCampaignRecipients {
    return UpdateEmailCampaignRecipientsFromJSONTyped(json, false);
}

export function UpdateEmailCampaignRecipientsFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateEmailCampaignRecipients {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'exclusionListIds': !exists(json, 'exclusionListIds') ? undefined : json['exclusionListIds'],
        'listIds': !exists(json, 'listIds') ? undefined : json['listIds'],
    };
}

export function UpdateEmailCampaignRecipientsToJSON(value?: UpdateEmailCampaignRecipients | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'exclusionListIds': value.exclusionListIds,
        'listIds': value.listIds,
    };
}

