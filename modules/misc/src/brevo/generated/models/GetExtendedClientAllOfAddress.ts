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
 * Address informations
 * @export
 * @interface GetExtendedClientAllOfAddress
 */
export interface GetExtendedClientAllOfAddress {
    /**
     * Street information
     * @type {string}
     * @memberof GetExtendedClientAllOfAddress
     */
    street: string;
    /**
     * City information
     * @type {string}
     * @memberof GetExtendedClientAllOfAddress
     */
    city: string;
    /**
     * Zip Code information
     * @type {string}
     * @memberof GetExtendedClientAllOfAddress
     */
    zipCode: string;
    /**
     * Country information
     * @type {string}
     * @memberof GetExtendedClientAllOfAddress
     */
    country: string;
}

/**
 * Check if a given object implements the GetExtendedClientAllOfAddress interface.
 */
export function instanceOfGetExtendedClientAllOfAddress(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "street" in value;
    isInstance = isInstance && "city" in value;
    isInstance = isInstance && "zipCode" in value;
    isInstance = isInstance && "country" in value;

    return isInstance;
}

export function GetExtendedClientAllOfAddressFromJSON(json: any): GetExtendedClientAllOfAddress {
    return GetExtendedClientAllOfAddressFromJSONTyped(json, false);
}

export function GetExtendedClientAllOfAddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetExtendedClientAllOfAddress {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'street': json['street'],
        'city': json['city'],
        'zipCode': json['zipCode'],
        'country': json['country'],
    };
}

export function GetExtendedClientAllOfAddressToJSON(value?: GetExtendedClientAllOfAddress | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'street': value.street,
        'city': value.city,
        'zipCode': value.zipCode,
        'country': value.country,
    };
}

