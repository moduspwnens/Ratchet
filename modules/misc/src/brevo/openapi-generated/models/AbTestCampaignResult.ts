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
import type { AbTestCampaignResultClickedLinks } from './AbTestCampaignResultClickedLinks.js';
import {
    AbTestCampaignResultClickedLinksFromJSON,
    AbTestCampaignResultClickedLinksFromJSONTyped,
    AbTestCampaignResultClickedLinksToJSON,
} from './AbTestCampaignResultClickedLinks.js';
import type { AbTestCampaignResultStatistics } from './AbTestCampaignResultStatistics.js';
import {
    AbTestCampaignResultStatisticsFromJSON,
    AbTestCampaignResultStatisticsFromJSONTyped,
    AbTestCampaignResultStatisticsToJSON,
} from './AbTestCampaignResultStatistics.js';

/**
 * 
 * @export
 * @interface AbTestCampaignResult
 */
export interface AbTestCampaignResult {
    /**
     * Winning Campaign Info. pending = Campaign has been picked for sending and winning version is yet to be decided, tie = A tie happened between both the versions, notAvailable = Campaign has not yet been picked for sending.
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    winningVersion?: AbTestCampaignResultWinningVersionEnum;
    /**
     * Criteria choosen for winning version (Open/Click)
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    winningCriteria?: AbTestCampaignResultWinningCriteriaEnum;
    /**
     * Subject Line of current winning version
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    winningSubjectLine?: string;
    /**
     * Open rate for current winning version
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    openRate?: string;
    /**
     * Click rate for current winning version
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    clickRate?: string;
    /**
     * Open/Click rate for the winner version
     * @type {string}
     * @memberof AbTestCampaignResult
     */
    winningVersionRate?: string;
    /**
     * 
     * @type {AbTestCampaignResultStatistics}
     * @memberof AbTestCampaignResult
     */
    statistics?: AbTestCampaignResultStatistics;
    /**
     * 
     * @type {AbTestCampaignResultClickedLinks}
     * @memberof AbTestCampaignResult
     */
    clickedLinks?: AbTestCampaignResultClickedLinks;
}

/**
* @export
* @enum {string}
*/
export enum AbTestCampaignResultWinningVersionEnum {
    NotAvailable = 'notAvailable',
    Pending = 'pending',
    Tie = 'tie',
    A = 'A',
    B = 'B'
}
/**
* @export
* @enum {string}
*/
export enum AbTestCampaignResultWinningCriteriaEnum {
    Open = 'Open',
    Click = 'Click'
}


/**
 * Check if a given object implements the AbTestCampaignResult interface.
 */
export function instanceOfAbTestCampaignResult(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbTestCampaignResultFromJSON(json: any): AbTestCampaignResult {
    return AbTestCampaignResultFromJSONTyped(json, false);
}

export function AbTestCampaignResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbTestCampaignResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'winningVersion': !exists(json, 'winningVersion') ? undefined : json['winningVersion'],
        'winningCriteria': !exists(json, 'winningCriteria') ? undefined : json['winningCriteria'],
        'winningSubjectLine': !exists(json, 'winningSubjectLine') ? undefined : json['winningSubjectLine'],
        'openRate': !exists(json, 'openRate') ? undefined : json['openRate'],
        'clickRate': !exists(json, 'clickRate') ? undefined : json['clickRate'],
        'winningVersionRate': !exists(json, 'winningVersionRate') ? undefined : json['winningVersionRate'],
        'statistics': !exists(json, 'statistics') ? undefined : AbTestCampaignResultStatisticsFromJSON(json['statistics']),
        'clickedLinks': !exists(json, 'clickedLinks') ? undefined : AbTestCampaignResultClickedLinksFromJSON(json['clickedLinks']),
    };
}

export function AbTestCampaignResultToJSON(value?: AbTestCampaignResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'winningVersion': value.winningVersion,
        'winningCriteria': value.winningCriteria,
        'winningSubjectLine': value.winningSubjectLine,
        'openRate': value.openRate,
        'clickRate': value.clickRate,
        'winningVersionRate': value.winningVersionRate,
        'statistics': AbTestCampaignResultStatisticsToJSON(value.statistics),
        'clickedLinks': AbTestCampaignResultClickedLinksToJSON(value.clickedLinks),
    };
}

