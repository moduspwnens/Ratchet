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
 * @interface GetAttributesAttributesInnerEnumerationInner
 */
export interface GetAttributesAttributesInnerEnumerationInner {
    /**
     * ID of Value of the "category" type attribute
     * @type {number}
     * @memberof GetAttributesAttributesInnerEnumerationInner
     */
    value: number;
    /**
     * Label of the "category" type attribute
     * @type {string}
     * @memberof GetAttributesAttributesInnerEnumerationInner
     */
    label: string;
}

/**
 * Check if a given object implements the GetAttributesAttributesInnerEnumerationInner interface.
 */
export function instanceOfGetAttributesAttributesInnerEnumerationInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "value" in value;
    isInstance = isInstance && "label" in value;

    return isInstance;
}

export function GetAttributesAttributesInnerEnumerationInnerFromJSON(json: any): GetAttributesAttributesInnerEnumerationInner {
    return GetAttributesAttributesInnerEnumerationInnerFromJSONTyped(json, false);
}

export function GetAttributesAttributesInnerEnumerationInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetAttributesAttributesInnerEnumerationInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': json['value'],
        'label': json['label'],
    };
}

export function GetAttributesAttributesInnerEnumerationInnerToJSON(value?: GetAttributesAttributesInnerEnumerationInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
        'label': value.label,
    };
}

