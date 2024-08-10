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
 * @interface CreateSmsCampaignRecipients
 */
export interface CreateSmsCampaignRecipients {
    /**
     * Lists Ids to send the campaign to. REQUIRED if scheduledAt is not empty
     * @type {Array<number>}
     * @memberof CreateSmsCampaignRecipients
     */
    listIds: Array<number>;
    /**
     * List ids which have to be excluded from a campaign
     * @type {Array<number>}
     * @memberof CreateSmsCampaignRecipients
     */
    exclusionListIds?: Array<number>;
}

/**
 * Check if a given object implements the CreateSmsCampaignRecipients interface.
 */
export function instanceOfCreateSmsCampaignRecipients(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "listIds" in value;

    return isInstance;
}

export function CreateSmsCampaignRecipientsFromJSON(json: any): CreateSmsCampaignRecipients {
    return CreateSmsCampaignRecipientsFromJSONTyped(json, false);
}

export function CreateSmsCampaignRecipientsFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSmsCampaignRecipients {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'listIds': json['listIds'],
        'exclusionListIds': !exists(json, 'exclusionListIds') ? undefined : json['exclusionListIds'],
    };
}

export function CreateSmsCampaignRecipientsToJSON(value?: CreateSmsCampaignRecipients | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'listIds': value.listIds,
        'exclusionListIds': value.exclusionListIds,
    };
}

