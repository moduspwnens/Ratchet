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
import type { GetSmtpTemplateOverview } from './GetSmtpTemplateOverview.js';
import {
    GetSmtpTemplateOverviewFromJSON,
    GetSmtpTemplateOverviewFromJSONTyped,
    GetSmtpTemplateOverviewToJSON,
} from './GetSmtpTemplateOverview.js';

/**
 * 
 * @export
 * @interface GetSmtpTemplates
 */
export interface GetSmtpTemplates {
    /**
     * Count of transactional email templates
     * @type {number}
     * @memberof GetSmtpTemplates
     */
    count?: number;
    /**
     * 
     * @type {Array<GetSmtpTemplateOverview>}
     * @memberof GetSmtpTemplates
     */
    templates?: Array<GetSmtpTemplateOverview>;
}

/**
 * Check if a given object implements the GetSmtpTemplates interface.
 */
export function instanceOfGetSmtpTemplates(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetSmtpTemplatesFromJSON(json: any): GetSmtpTemplates {
    return GetSmtpTemplatesFromJSONTyped(json, false);
}

export function GetSmtpTemplatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetSmtpTemplates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'templates': !exists(json, 'templates') ? undefined : ((json['templates'] as Array<any>).map(GetSmtpTemplateOverviewFromJSON)),
    };
}

export function GetSmtpTemplatesToJSON(value?: GetSmtpTemplates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'templates': value.templates === undefined ? undefined : ((value.templates as Array<any>).map(GetSmtpTemplateOverviewToJSON)),
    };
}

