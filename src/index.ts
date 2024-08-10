import ky from 'ky';
import createFetchClient from 'openapi-fetch';
import type { paths } from './types';

/**
 * Creates an OAuth 2.0 (3LO) API client for Jira.
 *
 * @param {Object} options - The configuration options for the OAuth 2.0 client.
 * @param {string} options.cloudId - The Jira cloud ID.
 * @param {string} options.accessToken - The OAuth 2.0 access token.
 * @param {number} [options.retries=3] - The number of retry attempts for API calls.
 * @returns {ReturnType<typeof createFetchClient<paths>>} The configured OAuth 2.0 API client.
 */
export const createOauth2Client = ({
  cloudId,
  accessToken,
  retries = 3,
}: {
  cloudId: string;
  accessToken: string;
  retries?: number;
}) =>
  createFetchClient<paths>({
    baseUrl: `https://api.atlassian.com/ex/jira/${cloudId}`,
    headers: {
      'Content-Type': 'application/json',
      // biome-ignore lint/style/useNamingConvention: "Authorization" is a standard header
      Authorization: `Bearer ${accessToken}`,
    },
    fetch: async (request) => {
      return await ky(request, {
        retry: {
          limit: retries,
        },
      });
    },
  });

/**
 * Creates a basic authentication API client for Jira.
 *
 * @param {Object} options - The configuration options for the basic auth client.
 * @param {string} options.siteUrl - The Jira site URL.
 * @param {string} options.email - The user's email address.
 * @param {string} options.apiToken - The user's API token.
 * @param {number} [options.retries=3] - The number of retry attempts for API calls.
 * @returns {ReturnType<typeof createFetchClient<paths>>} The configured basic auth API client.
 */
export const createBasicAuthClient = ({
  siteUrl,
  email,
  apiToken,
  retries = 3,
}: {
  siteUrl: string;
  email: string;
  apiToken: string;
  retries?: number;
}) =>
  createFetchClient<paths>({
    baseUrl: `${siteUrl}`,
    headers: {
      'Content-Type': 'application/json',
      // biome-ignore lint/style/useNamingConvention: "Authorization" is a standard header
      Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
    },
    fetch: async (request) => {
      return await ky(request, {
        retry: {
          limit: retries,
        },
      });
    },
  });
