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
 * @interface CreateSenderModel
 */
export interface CreateSenderModel {
    /**
     * ID of the Sender created
     * @type {number}
     * @memberof CreateSenderModel
     */
    id: number;
    /**
     * Status of SPF configuration for the sender (true = SPF not well configured, false = SPF well configured)
     * @type {boolean}
     * @memberof CreateSenderModel
     */
    spfError?: boolean;
    /**
     * Status of DKIM configuration for the sender (true = DKIM not well configured, false = DKIM well configured)
     * @type {boolean}
     * @memberof CreateSenderModel
     */
    dkimError?: boolean;
}

/**
 * Check if a given object implements the CreateSenderModel interface.
 */
export function instanceOfCreateSenderModel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function CreateSenderModelFromJSON(json: any): CreateSenderModel {
    return CreateSenderModelFromJSONTyped(json, false);
}

export function CreateSenderModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSenderModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'spfError': !exists(json, 'spfError') ? undefined : json['spfError'],
        'dkimError': !exists(json, 'dkimError') ? undefined : json['dkimError'],
    };
}

export function CreateSenderModelToJSON(value?: CreateSenderModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'spfError': value.spfError,
        'dkimError': value.dkimError,
    };
}

