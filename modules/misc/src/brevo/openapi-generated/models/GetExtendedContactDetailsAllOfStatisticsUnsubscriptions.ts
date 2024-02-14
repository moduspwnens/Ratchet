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
import type { GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscription } from './GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscription.js';
import {
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscriptionFromJSON,
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscriptionFromJSONTyped,
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscriptionToJSON,
} from './GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscription.js';
import type { GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscription } from './GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscription.js';
import {
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscriptionFromJSON,
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscriptionFromJSONTyped,
    GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscriptionToJSON,
} from './GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscription.js';

/**
 * Listing of the unsubscription for the contact
 * @export
 * @interface GetExtendedContactDetailsAllOfStatisticsUnsubscriptions
 */
export interface GetExtendedContactDetailsAllOfStatisticsUnsubscriptions {
    /**
     * Contact unsubscribe via unsubscription link in a campaign
     * @type {Array<GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscription>}
     * @memberof GetExtendedContactDetailsAllOfStatisticsUnsubscriptions
     */
    userUnsubscription: Array<GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscription>;
    /**
     * Contact has been unsubscribed from the administrator
     * @type {Array<GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscription>}
     * @memberof GetExtendedContactDetailsAllOfStatisticsUnsubscriptions
     */
    adminUnsubscription: Array<GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscription>;
}

/**
 * Check if a given object implements the GetExtendedContactDetailsAllOfStatisticsUnsubscriptions interface.
 */
export function instanceOfGetExtendedContactDetailsAllOfStatisticsUnsubscriptions(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "userUnsubscription" in value;
    isInstance = isInstance && "adminUnsubscription" in value;

    return isInstance;
}

export function GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsFromJSON(json: any): GetExtendedContactDetailsAllOfStatisticsUnsubscriptions {
    return GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsFromJSONTyped(json, false);
}

export function GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetExtendedContactDetailsAllOfStatisticsUnsubscriptions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userUnsubscription': ((json['userUnsubscription'] as Array<any>).map(GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscriptionFromJSON)),
        'adminUnsubscription': ((json['adminUnsubscription'] as Array<any>).map(GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscriptionFromJSON)),
    };
}

export function GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsToJSON(value?: GetExtendedContactDetailsAllOfStatisticsUnsubscriptions | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userUnsubscription': ((value.userUnsubscription as Array<any>).map(GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsUserUnsubscriptionToJSON)),
        'adminUnsubscription': ((value.adminUnsubscription as Array<any>).map(GetExtendedContactDetailsAllOfStatisticsUnsubscriptionsAdminUnsubscriptionToJSON)),
    };
}

