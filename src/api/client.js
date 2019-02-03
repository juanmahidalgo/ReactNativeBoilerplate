// @flow

// import { Schema } from 'normalizr';
import { merge } from 'lodash';
import { version } from 'package.json';
import { Platform } from 'react-native';

type SpecialParameters = {
  forceRefresh?: boolean,
  loadMore?: boolean,
  perPage?: number,
};

type FetchParameters = {
  method?: string,
  headers?: Object,
  body?: Object,
};

type UpdateEntity = {
  type: string,
  id: string,
  updater: Function,
};

type BaseCallParameters = {
  // schema: Schema,
  params: SpecialParameters,
  fetchParameters?: FetchParameters,
  normalizrKey?: string,
  paginationArgs?: Array<string | number | boolean>,
  entityId?: String | number,
  updateEntity?: UpdateEntity,
};

export type CallParameters = {
  ...BaseCallParameters,
  endpoint: string,
};

export type CallType = {
  ...CallParameters,
  type: string,
};

export class Client {
  API_ROOT = 'https://api.github.com/';

  /**
   * Enum for HTTP methods.
   *
   * @enum {string}
   */
  Method = {
    GET: 'GET',
    HEAD: 'HEAD',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
  };

  Accept = {
    JSON: 'application/json',
  };

  authHeaders = {};

  call = async (
    url: string,
    params: SpecialParameters = {},
    fetchParameters: FetchParameters = {}
  ) => {
    let finalUrl = url;

    // add explicitely specified parameters
    if (params.perPage) {
      finalUrl = `${finalUrl}${
        finalUrl.includes('?') ? '&' : '?'
      }per_page=${Number(params.perPage).toString()}`;
    }

    if (!finalUrl.includes(this.API_ROOT)) {
      finalUrl = `${this.API_ROOT}${finalUrl}`;
    }

    const { method, headers, body } = fetchParameters;

    const parameters: any = {
      method,
      headers: {
        'Cache-Control': 'no-cache',
        ...this.authHeaders,
        ...headers,
      },
    };

    if (body) {
      parameters.body = JSON.stringify(body);
    }

    return fetch(finalUrl, parameters);
  };

  put = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'put',
    params: {},
    ...config,
    fetchParameters: merge(
      {
        method: this.Method.PUT,
        headers: { Accept: this.Accept.JSON, 'Content-Length': 0 },
      },
      fetchParameters
    ),
  });

  get = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'get',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.GET, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  delete = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'delete',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.DELETE, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  create = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'create',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.POST, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  /**
   * Sets the authorization headers given an access token.
   *
   * @abstract
   * @param {string} token The oAuth access token
   */
  setAuthHeaders = (token: string) => {
    this.authHeaders = { Authorization: `token ${token}` };
  };
}