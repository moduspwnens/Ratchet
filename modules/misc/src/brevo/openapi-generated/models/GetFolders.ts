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
import type { GetFolder } from './GetFolder.js';
import {
    GetFolderFromJSON,
    GetFolderFromJSONTyped,
    GetFolderToJSON,
} from './GetFolder.js';

/**
 * 
 * @export
 * @interface GetFolders
 */
export interface GetFolders {
    /**
     * 
     * @type {Array<GetFolder>}
     * @memberof GetFolders
     */
    folders?: Array<GetFolder>;
    /**
     * Number of folders available in your account
     * @type {number}
     * @memberof GetFolders
     */
    count?: number;
}

/**
 * Check if a given object implements the GetFolders interface.
 */
export function instanceOfGetFolders(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetFoldersFromJSON(json: any): GetFolders {
    return GetFoldersFromJSONTyped(json, false);
}

export function GetFoldersFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetFolders {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'folders': !exists(json, 'folders') ? undefined : ((json['folders'] as Array<any>).map(GetFolderFromJSON)),
        'count': !exists(json, 'count') ? undefined : json['count'],
    };
}

export function GetFoldersToJSON(value?: GetFolders | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'folders': value.folders === undefined ? undefined : ((value.folders as Array<any>).map(GetFolderToJSON)),
        'count': value.count,
    };
}

