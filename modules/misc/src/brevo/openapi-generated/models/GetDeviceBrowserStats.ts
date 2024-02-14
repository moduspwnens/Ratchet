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
 * @interface GetDeviceBrowserStats
 */
export interface GetDeviceBrowserStats {
    /**
     * Number of total clicks for the campaign using the particular browser
     * @type {number}
     * @memberof GetDeviceBrowserStats
     */
    clickers: number;
    /**
     * Number of unique clicks for the campaign using the particular browser
     * @type {number}
     * @memberof GetDeviceBrowserStats
     */
    uniqueClicks: number;
    /**
     * Number of openings for the campaign using the particular browser
     * @type {number}
     * @memberof GetDeviceBrowserStats
     */
    viewed: number;
    /**
     * Number of unique openings for the campaign using the particular browser
     * @type {number}
     * @memberof GetDeviceBrowserStats
     */
    uniqueViews: number;
}

/**
 * Check if a given object implements the GetDeviceBrowserStats interface.
 */
export function instanceOfGetDeviceBrowserStats(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "clickers" in value;
    isInstance = isInstance && "uniqueClicks" in value;
    isInstance = isInstance && "viewed" in value;
    isInstance = isInstance && "uniqueViews" in value;

    return isInstance;
}

export function GetDeviceBrowserStatsFromJSON(json: any): GetDeviceBrowserStats {
    return GetDeviceBrowserStatsFromJSONTyped(json, false);
}

export function GetDeviceBrowserStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetDeviceBrowserStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clickers': json['clickers'],
        'uniqueClicks': json['uniqueClicks'],
        'viewed': json['viewed'],
        'uniqueViews': json['uniqueViews'],
    };
}

export function GetDeviceBrowserStatsToJSON(value?: GetDeviceBrowserStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clickers': value.clickers,
        'uniqueClicks': value.uniqueClicks,
        'viewed': value.viewed,
        'uniqueViews': value.uniqueViews,
    };
}

