# next-security

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![License][license-src]][license-href]

Security plugin for Next.js based on OWASP and Helmet.

## Features

- No configuration security headers similar to Helmet.js
- Customization of all header values
- `[Coming soon]` Content Security Policy (CSP) for SSG apps
- `[Coming soon]`Request Size limiter
- `[Coming soon]`Cross Site Scripting (XSS) Validation
- `[Coming soon]`Cross-Origin Resource Sharing (CORS) support
- `[Coming soon]` `[Optional]` Allowed HTTP Methods, Basic Auth, CSRF, Rate Limiter

## Usage

Install the plugin:

```sh
npm i next-security
yarn add next-security
pnpm add next-security
```

Add the plugin to the `next.config.js` like following :

```js
/** @type {import('next').NextConfig} */
const { nextSecurity } = require('next-security');
const nextConfig = {
  ...nextSecurity(), // with this approach you will also hide the `X-Powered-By` header that is a good pattern
};

module.exports = nextConfig;
```

Or, if you want to have more control over the source for the headers:

```js
/** @type {import('next').NextConfig} */
const { generateSecurityHeaders } = require('next-security');
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: generateSecurityHeaders(),
      },
    ];
  },
  // poweredByHeader: false // you can add this manually
};

module.exports = nextConfig;
```

And that's it! The plugin will now register security response headers so that your application will be more secure.

If you inspect the headers that are being returned by the Next application in the browser, you should see the following result:

```md
cross-origin-resource-policy: same-origin
cross-origin-opener-policy: same-origin
cross-origin-embedder-policy: require-corp
content-security-policy: base-uri 'self'; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests
origin-agent-cluster: ?1
referrer-policy: no-referrer
strict-transport-security: max-age=15552000; includeSubDomains
x-content-type-options: nosniff
x-dns-prefetch-control: off
x-download-options: noopen
x-frame-options: SAMEORIGIN
x-permitted-cross-domain-policies: none
x-xss-protection: 0
permissions-policy: camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()
```

## Configuration

You can pass configuration to the plugin like following:

```js
/** @type {import('next').NextConfig} */
const { nextSecurity } = require('next-security');
const nextConfig = {
  ...nextSecurity({
    headers: {
      xXSSProtection: '1',
      crossOriginResourcePolicy: 'cross-origin',
      contentSecurityPolicy: false,
    },
  }),
};

module.exports = nextConfig;
```

[npm-version-src]: https://img.shields.io/npm/v/next-security/latest.svg
[npm-version-href]: https://npmjs.com/package/next-security
[npm-downloads-src]: https://img.shields.io/npm/dt/next-security.svg
[npm-downloads-href]: https://npmjs.com/package/next-security
[github-actions-ci-src]: https://github.com/baroshem/next-security/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/baroshem/next-security/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/next-security.svg
[license-href]: https://npmjs.com/package/next-security
