/* eslint-disable */
/**
 * Sobol API Docs
 * An OpenAPI Implementation exposing Sobol\'s RESTful API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: team@sobol.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime.js';
/**
 * 
 * @export
 * @interface CustomFieldBadgeContentBadgesInner
 */
export interface CustomFieldBadgeContentBadgesInner {
    /**
     * 
     * @type {string}
     * @memberof CustomFieldBadgeContentBadgesInner
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomFieldBadgeContentBadgesInner
     */
    name?: string;
}

/**
 * Check if a given object implements the CustomFieldBadgeContentBadgesInner interface.
 */
export function instanceOfCustomFieldBadgeContentBadgesInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CustomFieldBadgeContentBadgesInnerFromJSON(json: any): CustomFieldBadgeContentBadgesInner {
    return CustomFieldBadgeContentBadgesInnerFromJSONTyped(json, false);
}

export function CustomFieldBadgeContentBadgesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomFieldBadgeContentBadgesInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function CustomFieldBadgeContentBadgesInnerToJSON(value?: CustomFieldBadgeContentBadgesInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}

