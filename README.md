# atlassian-ts

A type-safe client for the Atlassian REST API, powered by openapi-fetch and ky.

## Installation

```bash
pnpm add atlassian-ts
```

## Usage

You can create a client for either OAuth 2.0 or Basic Authentication.

### OAuth 2.0 Client

For integrations that are not Forge or Connect apps, use OAuth 2.0 authorization code grants (3LO) for security (3LO scopes are shown as for operations OAuth scopes required). Read more [here](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/).

```ts
import { createOAuth2Client } from 'atlassian-ts';

const client = createOAuth2Client({
  cloudId: 'your-cloud-id',
  accessToken: 'your-access-token',
  retries: 3,
});

const projects = await client.get('/rest/api/3/project');
```

### Basic Authentication Client

```ts
import { createBasicAuthClient } from 'atlassian-ts';

const client = createBasicAuthClient({
  siteUrl: 'https://your-site.atlassian.net',
  email: 'your-email@example.com',
  apiToken: 'your-api-token',
  retries: 3,
});

const projects = await client.get('/rest/api/3/project');
```