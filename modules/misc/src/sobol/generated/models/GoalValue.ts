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
 * @interface GoalValue
 */
export interface GoalValue {
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _id: string;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _type?: GoalValueTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _rootId: string;
    /**
     * 
     * @type {Date}
     * @memberof GoalValue
     */
    _createdOn?: Date;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _createdBy: string;
    /**
     * 
     * @type {Date}
     * @memberof GoalValue
     */
    _updatedOn?: Date;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _updatedBy?: string;
    /**
     * 
     * @type {Date}
     * @memberof GoalValue
     */
    _archivedOn?: Date;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _archivedBy?: string;
    /**
     * 
     * @type {Date}
     * @memberof GoalValue
     */
    _deletedOn?: Date;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _deletedBy?: string;
    /**
     * 
     * @type {string}
     * @memberof GoalValue
     */
    _operationId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof GoalValue
     */
    _isPublic?: boolean;
    /**
     * 
     * @type {number}
     * @memberof GoalValue
     */
    value: number;
}

/**
* @export
* @enum {string}
*/
export enum GoalValueTypeEnum {
    goal_value = 'goal_value'
}


/**
 * Check if a given object implements the GoalValue interface.
 */
export function instanceOfGoalValue(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "_id" in value;
    isInstance = isInstance && "_rootId" in value;
    isInstance = isInstance && "_createdBy" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function GoalValueFromJSON(json: any): GoalValue {
    return GoalValueFromJSONTyped(json, false);
}

export function GoalValueFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoalValue {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_id': json['_id'],
        '_type': !exists(json, '_type') ? undefined : json['_type'],
        '_rootId': json['_rootId'],
        '_createdOn': !exists(json, '_createdOn') ? undefined : (new Date(json['_createdOn'])),
        '_createdBy': json['_createdBy'],
        '_updatedOn': !exists(json, '_updatedOn') ? undefined : (new Date(json['_updatedOn'])),
        '_updatedBy': !exists(json, '_updatedBy') ? undefined : json['_updatedBy'],
        '_archivedOn': !exists(json, '_archivedOn') ? undefined : (new Date(json['_archivedOn'])),
        '_archivedBy': !exists(json, '_archivedBy') ? undefined : json['_archivedBy'],
        '_deletedOn': !exists(json, '_deletedOn') ? undefined : (new Date(json['_deletedOn'])),
        '_deletedBy': !exists(json, '_deletedBy') ? undefined : json['_deletedBy'],
        '_operationId': !exists(json, '_operationId') ? undefined : json['_operationId'],
        '_isPublic': !exists(json, '_isPublic') ? undefined : json['_isPublic'],
        'value': json['value'],
    };
}

export function GoalValueToJSON(value?: GoalValue | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '_id': value._id,
        '_type': value._type,
        '_rootId': value._rootId,
        '_createdOn': value._createdOn === undefined ? undefined : (value._createdOn.toISOString()),
        '_createdBy': value._createdBy,
        '_updatedOn': value._updatedOn === undefined ? undefined : (value._updatedOn.toISOString()),
        '_updatedBy': value._updatedBy,
        '_archivedOn': value._archivedOn === undefined ? undefined : (value._archivedOn.toISOString()),
        '_archivedBy': value._archivedBy,
        '_deletedOn': value._deletedOn === undefined ? undefined : (value._deletedOn.toISOString()),
        '_deletedBy': value._deletedBy,
        '_operationId': value._operationId,
        '_isPublic': value._isPublic,
        'value': value.value,
    };
}

