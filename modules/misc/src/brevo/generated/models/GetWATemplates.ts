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
import type { GetWATemplatesTemplatesInner } from './GetWATemplatesTemplatesInner.js';
import {
    GetWATemplatesTemplatesInnerFromJSON,
    GetWATemplatesTemplatesInnerFromJSONTyped,
    GetWATemplatesTemplatesInnerToJSON,
} from './GetWATemplatesTemplatesInner.js';

/**
 * 
 * @export
 * @interface GetWATemplates
 */
export interface GetWATemplates {
    /**
     * 
     * @type {Array<GetWATemplatesTemplatesInner>}
     * @memberof GetWATemplates
     */
    templates: Array<GetWATemplatesTemplatesInner>;
    /**
     * Number of whatsApp templates retrived
     * @type {number}
     * @memberof GetWATemplates
     */
    count: number;
}

/**
 * Check if a given object implements the GetWATemplates interface.
 */
export function instanceOfGetWATemplates(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "templates" in value;
    isInstance = isInstance && "count" in value;

    return isInstance;
}

export function GetWATemplatesFromJSON(json: any): GetWATemplates {
    return GetWATemplatesFromJSONTyped(json, false);
}

export function GetWATemplatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetWATemplates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'templates': ((json['templates'] as Array<any>).map(GetWATemplatesTemplatesInnerFromJSON)),
        'count': json['count'],
    };
}

export function GetWATemplatesToJSON(value?: GetWATemplates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'templates': ((value.templates as Array<any>).map(GetWATemplatesTemplatesInnerToJSON)),
        'count': value.count,
    };
}

