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
import type { CustomFieldSingleSelectDropDownConfigOptionsValue } from './CustomFieldSingleSelectDropDownConfigOptionsValue.js';
import {
    CustomFieldSingleSelectDropDownConfigOptionsValueFromJSON,
    CustomFieldSingleSelectDropDownConfigOptionsValueFromJSONTyped,
    CustomFieldSingleSelectDropDownConfigOptionsValueToJSON,
} from './CustomFieldSingleSelectDropDownConfigOptionsValue.js';

/**
 * Multi select dropdown custom field config
 * @export
 * @interface CustomFieldSingleSelectDropDownConfig
 */
export interface CustomFieldSingleSelectDropDownConfig {
    /**
     * 
     * @type {{ [key: string]: CustomFieldSingleSelectDropDownConfigOptionsValue; }}
     * @memberof CustomFieldSingleSelectDropDownConfig
     */
    options?: { [key: string]: CustomFieldSingleSelectDropDownConfigOptionsValue; };
}

/**
 * Check if a given object implements the CustomFieldSingleSelectDropDownConfig interface.
 */
export function instanceOfCustomFieldSingleSelectDropDownConfig(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CustomFieldSingleSelectDropDownConfigFromJSON(json: any): CustomFieldSingleSelectDropDownConfig {
    return CustomFieldSingleSelectDropDownConfigFromJSONTyped(json, false);
}

export function CustomFieldSingleSelectDropDownConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomFieldSingleSelectDropDownConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'options': !exists(json, 'options') ? undefined : (mapValues(json['options'], CustomFieldSingleSelectDropDownConfigOptionsValueFromJSON)),
    };
}

export function CustomFieldSingleSelectDropDownConfigToJSON(value?: CustomFieldSingleSelectDropDownConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'options': value.options === undefined ? undefined : (mapValues(value.options, CustomFieldSingleSelectDropDownConfigOptionsValueToJSON)),
    };
}

