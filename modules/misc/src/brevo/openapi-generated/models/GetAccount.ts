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
import type { GetAccountAllOfMarketingAutomation } from './GetAccountAllOfMarketingAutomation.js';
import {
    GetAccountAllOfMarketingAutomationFromJSON,
    GetAccountAllOfMarketingAutomationFromJSONTyped,
    GetAccountAllOfMarketingAutomationToJSON,
} from './GetAccountAllOfMarketingAutomation.js';
import type { GetAccountAllOfPlan } from './GetAccountAllOfPlan.js';
import {
    GetAccountAllOfPlanFromJSON,
    GetAccountAllOfPlanFromJSONTyped,
    GetAccountAllOfPlanToJSON,
} from './GetAccountAllOfPlan.js';
import type { GetAccountAllOfRelay } from './GetAccountAllOfRelay.js';
import {
    GetAccountAllOfRelayFromJSON,
    GetAccountAllOfRelayFromJSONTyped,
    GetAccountAllOfRelayToJSON,
} from './GetAccountAllOfRelay.js';
import type { GetExtendedClientAllOfAddress } from './GetExtendedClientAllOfAddress.js';
import {
    GetExtendedClientAllOfAddressFromJSON,
    GetExtendedClientAllOfAddressFromJSONTyped,
    GetExtendedClientAllOfAddressToJSON,
} from './GetExtendedClientAllOfAddress.js';

/**
 * 
 * @export
 * @interface GetAccount
 */
export interface GetAccount {
    /**
     * Login Email
     * @type {string}
     * @memberof GetAccount
     */
    email: string;
    /**
     * First Name
     * @type {string}
     * @memberof GetAccount
     */
    firstName: string;
    /**
     * Last Name
     * @type {string}
     * @memberof GetAccount
     */
    lastName: string;
    /**
     * Name of the company
     * @type {string}
     * @memberof GetAccount
     */
    companyName: string;
    /**
     * 
     * @type {GetExtendedClientAllOfAddress}
     * @memberof GetAccount
     */
    address: GetExtendedClientAllOfAddress;
    /**
     * Information about your plans and credits
     * @type {Array<GetAccountAllOfPlan>}
     * @memberof GetAccount
     */
    plan: Array<GetAccountAllOfPlan>;
    /**
     * 
     * @type {GetAccountAllOfRelay}
     * @memberof GetAccount
     */
    relay: GetAccountAllOfRelay;
    /**
     * 
     * @type {GetAccountAllOfMarketingAutomation}
     * @memberof GetAccount
     */
    marketingAutomation?: GetAccountAllOfMarketingAutomation;
}

/**
 * Check if a given object implements the GetAccount interface.
 */
export function instanceOfGetAccount(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "firstName" in value;
    isInstance = isInstance && "lastName" in value;
    isInstance = isInstance && "companyName" in value;
    isInstance = isInstance && "address" in value;
    isInstance = isInstance && "plan" in value;
    isInstance = isInstance && "relay" in value;

    return isInstance;
}

export function GetAccountFromJSON(json: any): GetAccount {
    return GetAccountFromJSONTyped(json, false);
}

export function GetAccountFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetAccount {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'companyName': json['companyName'],
        'address': GetExtendedClientAllOfAddressFromJSON(json['address']),
        'plan': ((json['plan'] as Array<any>).map(GetAccountAllOfPlanFromJSON)),
        'relay': GetAccountAllOfRelayFromJSON(json['relay']),
        'marketingAutomation': !exists(json, 'marketingAutomation') ? undefined : GetAccountAllOfMarketingAutomationFromJSON(json['marketingAutomation']),
    };
}

export function GetAccountToJSON(value?: GetAccount | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'companyName': value.companyName,
        'address': GetExtendedClientAllOfAddressToJSON(value.address),
        'plan': ((value.plan as Array<any>).map(GetAccountAllOfPlanToJSON)),
        'relay': GetAccountAllOfRelayToJSON(value.relay),
        'marketingAutomation': GetAccountAllOfMarketingAutomationToJSON(value.marketingAutomation),
    };
}

