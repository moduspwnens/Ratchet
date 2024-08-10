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
 * @interface DeleteHardbounces
 */
export interface DeleteHardbounces {
    /**
     * Starting date (YYYY-MM-DD) of the time period for deletion. The hardbounces occurred after this date will be deleted. Must be less than or equal to the endDate
     * @type {string}
     * @memberof DeleteHardbounces
     */
    startDate?: string;
    /**
     * Ending date (YYYY-MM-DD) of the time period for deletion. The hardbounces until this date will be deleted. Must be greater than or equal to the startDate
     * @type {string}
     * @memberof DeleteHardbounces
     */
    endDate?: string;
    /**
     * Target a specific email address
     * @type {string}
     * @memberof DeleteHardbounces
     */
    contactEmail?: string;
}

/**
 * Check if a given object implements the DeleteHardbounces interface.
 */
export function instanceOfDeleteHardbounces(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DeleteHardbouncesFromJSON(json: any): DeleteHardbounces {
    return DeleteHardbouncesFromJSONTyped(json, false);
}

export function DeleteHardbouncesFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteHardbounces {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'startDate': !exists(json, 'startDate') ? undefined : json['startDate'],
        'endDate': !exists(json, 'endDate') ? undefined : json['endDate'],
        'contactEmail': !exists(json, 'contactEmail') ? undefined : json['contactEmail'],
    };
}

export function DeleteHardbouncesToJSON(value?: DeleteHardbounces | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'startDate': value.startDate,
        'endDate': value.endDate,
        'contactEmail': value.contactEmail,
    };
}

