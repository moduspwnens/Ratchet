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
 * @interface RoleAssignmentsInner
 */
export interface RoleAssignmentsInner {
    /**
     * 
     * @type {string}
     * @memberof RoleAssignmentsInner
     */
    _id?: string;
    /**
     * 
     * @type {string}
     * @memberof RoleAssignmentsInner
     */
    _type?: RoleAssignmentsInnerTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum RoleAssignmentsInnerTypeEnum {
    role_assignment = 'role_assignment'
}


/**
 * Check if a given object implements the RoleAssignmentsInner interface.
 */
export function instanceOfRoleAssignmentsInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RoleAssignmentsInnerFromJSON(json: any): RoleAssignmentsInner {
    return RoleAssignmentsInnerFromJSONTyped(json, false);
}

export function RoleAssignmentsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleAssignmentsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_id': !exists(json, '_id') ? undefined : json['_id'],
        '_type': !exists(json, '_type') ? undefined : json['_type'],
    };
}

export function RoleAssignmentsInnerToJSON(value?: RoleAssignmentsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_id': value._id,
        '_type': value._type,
    };
}

