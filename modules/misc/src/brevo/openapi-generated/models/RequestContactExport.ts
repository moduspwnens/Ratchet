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
import type { RequestContactExportCustomContactFilter } from './RequestContactExportCustomContactFilter.js';
import {
    RequestContactExportCustomContactFilterFromJSON,
    RequestContactExportCustomContactFilterFromJSONTyped,
    RequestContactExportCustomContactFilterToJSON,
} from './RequestContactExportCustomContactFilter.js';

/**
 * 
 * @export
 * @interface RequestContactExport
 */
export interface RequestContactExport {
    /**
     * List of all the attributes that you want to export. These attributes must be present in your contact database. For example, ['fname', 'lname', 'email'].
     * @type {Array<string>}
     * @memberof RequestContactExport
     */
    exportAttributes?: Array<string>;
    /**
     * This attribute has been deprecated and will be removed by January 1st, 2021. Only one of the two filter options (contactFilter or customContactFilter) can be passed in the request. Set the filter for the contacts to be exported. For example, {"blacklisted":true} will export all the blacklisted contacts.
     * 
     * @type {object}
     * @memberof RequestContactExport
     */
    contactFilter?: object;
    /**
     * 
     * @type {RequestContactExportCustomContactFilter}
     * @memberof RequestContactExport
     */
    customContactFilter?: RequestContactExportCustomContactFilter;
    /**
     * Webhook that will be called once the export process is finished. For reference, https://help.sendinblue.com/hc/en-us/articles/360007666479
     * @type {string}
     * @memberof RequestContactExport
     */
    notifyUrl?: string;
}

/**
 * Check if a given object implements the RequestContactExport interface.
 */
export function instanceOfRequestContactExport(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestContactExportFromJSON(json: any): RequestContactExport {
    return RequestContactExportFromJSONTyped(json, false);
}

export function RequestContactExportFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestContactExport {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'exportAttributes': !exists(json, 'exportAttributes') ? undefined : json['exportAttributes'],
        'contactFilter': !exists(json, 'contactFilter') ? undefined : json['contactFilter'],
        'customContactFilter': !exists(json, 'customContactFilter') ? undefined : RequestContactExportCustomContactFilterFromJSON(json['customContactFilter']),
        'notifyUrl': !exists(json, 'notifyUrl') ? undefined : json['notifyUrl'],
    };
}

export function RequestContactExportToJSON(value?: RequestContactExport | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'exportAttributes': value.exportAttributes,
        'contactFilter': value.contactFilter,
        'customContactFilter': RequestContactExportCustomContactFilterToJSON(value.customContactFilter),
        'notifyUrl': value.notifyUrl,
    };
}

