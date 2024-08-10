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


import * as runtime from '../runtime.js';
import type {
  CreateSender,
  CreateSenderModel,
  ErrorModel,
  GetIps,
  GetIpsFromSender,
  GetSendersList,
  UpdateSender,
} from '../models/index.js';
import {
    CreateSenderFromJSON,
    CreateSenderToJSON,
    CreateSenderModelFromJSON,
    CreateSenderModelToJSON,
    ErrorModelFromJSON,
    ErrorModelToJSON,
    GetIpsFromJSON,
    GetIpsToJSON,
    GetIpsFromSenderFromJSON,
    GetIpsFromSenderToJSON,
    GetSendersListFromJSON,
    GetSendersListToJSON,
    UpdateSenderFromJSON,
    UpdateSenderToJSON,
} from '../models/index.js';

export interface CreateSenderRequest {
    sender?: CreateSender;
}

export interface DeleteSenderRequest {
    senderId: number;
}

export interface GetIpsFromSenderRequest {
    senderId: number;
}

export interface GetSendersRequest {
    ip?: string;
    domain?: string;
}

export interface UpdateSenderRequest {
    senderId: number;
    sender?: UpdateSender;
}

/**
 * SendersApi - interface
 * 
 * @export
 * @interface SendersApiInterface
 */
export interface SendersApiInterface {
    /**
     * 
     * @summary Create a new sender
     * @param {CreateSender} [sender] sender\&#39;s name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    createSenderRaw(requestParameters: CreateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateSenderModel>>;

    /**
     * Create a new sender
     */
    createSender(requestParameters: CreateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateSenderModel>;

    /**
     * 
     * @summary Delete a sender
     * @param {number} senderId Id of the sender
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    deleteSenderRaw(requestParameters: DeleteSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Delete a sender
     */
    deleteSender(requestParameters: DeleteSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Get all the dedicated IPs for your account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    getIpsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetIps>>;

    /**
     * Get all the dedicated IPs for your account
     */
    getIps(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetIps>;

    /**
     * 
     * @summary Get all the dedicated IPs for a sender
     * @param {number} senderId Id of the sender
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    getIpsFromSenderRaw(requestParameters: GetIpsFromSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetIpsFromSender>>;

    /**
     * Get all the dedicated IPs for a sender
     */
    getIpsFromSender(requestParameters: GetIpsFromSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetIpsFromSender>;

    /**
     * 
     * @summary Get the list of all your senders
     * @param {string} [ip] Filter your senders for a specific ip (available for dedicated IP usage only)
     * @param {string} [domain] Filter your senders for a specific domain
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    getSendersRaw(requestParameters: GetSendersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSendersList>>;

    /**
     * Get the list of all your senders
     */
    getSenders(requestParameters: GetSendersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSendersList>;

    /**
     * 
     * @summary Update a sender
     * @param {number} senderId Id of the sender
     * @param {UpdateSender} [sender] sender\&#39;s name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SendersApiInterface
     */
    updateSenderRaw(requestParameters: UpdateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Update a sender
     */
    updateSender(requestParameters: UpdateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

}

/**
 * 
 */
export class SendersApi extends runtime.BaseAPI implements SendersApiInterface {

    /**
     * Create a new sender
     */
    async createSenderRaw(requestParameters: CreateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateSenderModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSenderToJSON(requestParameters.sender),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateSenderModelFromJSON(jsonValue));
    }

    /**
     * Create a new sender
     */
    async createSender(requestParameters: CreateSenderRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateSenderModel> {
        const response = await this.createSenderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a sender
     */
    async deleteSenderRaw(requestParameters: DeleteSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.senderId === null || requestParameters.senderId === undefined) {
            throw new runtime.RequiredError('senderId','Required parameter requestParameters.senderId was null or undefined when calling deleteSender.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders/{senderId}`.replace(`{${"senderId"}}`, encodeURIComponent(String(requestParameters.senderId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a sender
     */
    async deleteSender(requestParameters: DeleteSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteSenderRaw(requestParameters, initOverrides);
    }

    /**
     * Get all the dedicated IPs for your account
     */
    async getIpsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetIps>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders/ips`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetIpsFromJSON(jsonValue));
    }

    /**
     * Get all the dedicated IPs for your account
     */
    async getIps(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetIps> {
        const response = await this.getIpsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get all the dedicated IPs for a sender
     */
    async getIpsFromSenderRaw(requestParameters: GetIpsFromSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetIpsFromSender>> {
        if (requestParameters.senderId === null || requestParameters.senderId === undefined) {
            throw new runtime.RequiredError('senderId','Required parameter requestParameters.senderId was null or undefined when calling getIpsFromSender.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders/{senderId}/ips`.replace(`{${"senderId"}}`, encodeURIComponent(String(requestParameters.senderId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetIpsFromSenderFromJSON(jsonValue));
    }

    /**
     * Get all the dedicated IPs for a sender
     */
    async getIpsFromSender(requestParameters: GetIpsFromSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetIpsFromSender> {
        const response = await this.getIpsFromSenderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the list of all your senders
     */
    async getSendersRaw(requestParameters: GetSendersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSendersList>> {
        const queryParameters: any = {};

        if (requestParameters.ip !== undefined) {
            queryParameters['ip'] = requestParameters.ip;
        }

        if (requestParameters.domain !== undefined) {
            queryParameters['domain'] = requestParameters.domain;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetSendersListFromJSON(jsonValue));
    }

    /**
     * Get the list of all your senders
     */
    async getSenders(requestParameters: GetSendersRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSendersList> {
        const response = await this.getSendersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a sender
     */
    async updateSenderRaw(requestParameters: UpdateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.senderId === null || requestParameters.senderId === undefined) {
            throw new runtime.RequiredError('senderId','Required parameter requestParameters.senderId was null or undefined when calling updateSender.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = await this.configuration.apiKey("api-key"); // api-key authentication
        }

        const response = await this.request({
            path: `/senders/{senderId}`.replace(`{${"senderId"}}`, encodeURIComponent(String(requestParameters.senderId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateSenderToJSON(requestParameters.sender),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update a sender
     */
    async updateSender(requestParameters: UpdateSenderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateSenderRaw(requestParameters, initOverrides);
    }

}
