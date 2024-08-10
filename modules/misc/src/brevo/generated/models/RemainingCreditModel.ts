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
import type { RemainingCreditModelChild } from './RemainingCreditModelChild.js';
import {
    RemainingCreditModelChildFromJSON,
    RemainingCreditModelChildFromJSONTyped,
    RemainingCreditModelChildToJSON,
} from './RemainingCreditModelChild.js';
import type { RemainingCreditModelReseller } from './RemainingCreditModelReseller.js';
import {
    RemainingCreditModelResellerFromJSON,
    RemainingCreditModelResellerFromJSONTyped,
    RemainingCreditModelResellerToJSON,
} from './RemainingCreditModelReseller.js';

/**
 * 
 * @export
 * @interface RemainingCreditModel
 */
export interface RemainingCreditModel {
    /**
     * 
     * @type {RemainingCreditModelChild}
     * @memberof RemainingCreditModel
     */
    child: RemainingCreditModelChild;
    /**
     * 
     * @type {RemainingCreditModelReseller}
     * @memberof RemainingCreditModel
     */
    reseller: RemainingCreditModelReseller;
}

/**
 * Check if a given object implements the RemainingCreditModel interface.
 */
export function instanceOfRemainingCreditModel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "child" in value;
    isInstance = isInstance && "reseller" in value;

    return isInstance;
}

export function RemainingCreditModelFromJSON(json: any): RemainingCreditModel {
    return RemainingCreditModelFromJSONTyped(json, false);
}

export function RemainingCreditModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): RemainingCreditModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'child': RemainingCreditModelChildFromJSON(json['child']),
        'reseller': RemainingCreditModelResellerFromJSON(json['reseller']),
    };
}

export function RemainingCreditModelToJSON(value?: RemainingCreditModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'child': RemainingCreditModelChildToJSON(value.child),
        'reseller': RemainingCreditModelResellerToJSON(value.reseller),
    };
}

