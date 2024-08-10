# atlassian-ts

A type-safe Typescript client for the Atlassian REST API, powered by openapi-fetch and ky.

## Features

- Full TypeScript support for Atlassian REST API endpoints
- OAuth 2.0 and Basic Authentication support
- Automatic retries with configurable limits
- Built on top of robust libraries: openapi-fetch and ky

## Installation

```bash
pnpm add atlassian-ts
```

## Usage

You can create a client for either OAuth 2.0 or Basic Authentication.

### OAuth 2.0 Client

For integrations that are not Forge or Connect apps, use OAuth 2.0 authorization code grants (3LO) for security (3LO scopes are shown as for operations OAuth scopes required). Read more [here](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/).

```ts
import { createOauth2Client } from 'atlassian-ts';

const client = createOauth2Client({
  cloudId: 'your-cloud-id',
  accessToken: 'your-access-token',
  retries: 3,
});

const projects = await client.GET('/rest/api/3/project');
```

### Basic Authentication Client

For personal scripts, bots, and ad-hoc execution of the REST APIs use basic authentication. Read more [here](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).

```ts
import { createBasicAuthClient } from 'atlassian-ts';

const client = createBasicAuthClient({
  siteUrl: 'https://your-site.atlassian.net',
  email: 'your-email@example.com',
  apiToken: 'your-api-token',
  retries: 3,
});

const projects = await client.GET('/rest/api/3/project');
```
