import { Client } from './client';
import { API_URL } from '../../config';

export const RestClient = Client;

const ACCEPT = {
  JSON: 'application/json',
};

const CONTENT = {
  JSON: 'application/json',
};

const METHOD = {
  GET: 'GET',
  HEAD: 'HEAD',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
};

export const api = {
  root: API_URL,
  call: async (url, parameters) => {
    console.log('parameters: ', parameters);
    console.log('url: ', url);
    const finalUrl = `${api.root}${url}`;
    console.log('finalUrl: ', finalUrl);
    const response = await fetch(finalUrl, parameters);
    console.log('response: ', response);

    return response;
  },
  parameters: (
    accessToken,
    method = METHOD.GET,
    accept = ACCEPT.JSON,
    body = {}
  ) => {
    const withBody = [METHOD.PUT, METHOD.PATCH, METHOD.POST];
    const params = {
      method,
      headers: {
        Accept: accept,
        // Authorization: `token ${accessToken}`,
        'Content-Type': accept,
        'Cache-Control': 'no-cache',
      },
    };

    if (withBody.indexOf(method) !== -1) {
      params.body = JSON.stringify(body);
      if (method === METHOD.PUT) {
        params.headers['Content-Length'] = 0;
      }
    }

    return params;
  },
  delete: async (url, accessToken) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.DELETE)
    );

    return response;
  },
  get: async (url, accessToken) => {
    const response = await api.call(url, api.parameters(accessToken));

    return response;
  },
  getHtml: async (url, accessToken) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.GET, ACCEPT.HTML)
    );

    return response.text();
  },
  getJson: async (url, accessToken) => {
    const response = await api.call(url, api.parameters(accessToken));

    return response;
  },
  head: async (url, accessToken) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.HEAD)
    );

    return response;
  },
  post: async (url, accessToken, body = {}) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response;
  },
  put: async (url, accessToken, body = {}) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.PUT, ACCEPT.JSON, body)
    );

    return response;
  },
};

export const authUser = accessToken => api.getJson('/auth', accessToken);

export const login = (email, password) => api.post('/login', '', { email, password });

export const register = (email, password) => api.post('/register', '', { email, password });
