import {
  ContentSecurityPolicyValue,
  PermissionsPolicyValue,
  SECURITY_HEADER_NAMES,
  SecurityConfig,
  SecurityHeader,
  SecurityHeaders,
  StrictTransportSecurityValue,
} from './types';

const headerValueMappers = {
  strictTransportSecurity: (value: StrictTransportSecurityValue) =>
    [
      `max-age=${value.maxAge}`,
      value.includeSubdomains && 'includeSubDomains',
      value.preload && 'preload',
    ]
      .filter(Boolean)
      .join('; '),
  contentSecurityPolicy: (value: ContentSecurityPolicyValue) => {
    return Object.entries(value)
      .map(([directive, sources]) => {
        if (directive === 'upgrade-insecure-requests') {
          return sources ? 'upgrade-insecure-requests' : '';
        }
        return (
          (sources as string[])?.length &&
          `${directive} ${(sources as string[]).join(' ')}`
        );
      })
      .filter(Boolean)
      .join('; ');
  },
  permissionsPolicy: (value: PermissionsPolicyValue) =>
    Object.entries(value)
      .map(
        ([directive, sources]) =>
          (sources as string[])?.length &&
          `${directive}=${(sources as string[]).join(' ')}`
      )
      .filter(Boolean)
      .join(', '),
};

export const getHeaderValueFromOptions = <T>(
  headerType: keyof SecurityHeaders,
  headerOptions: T
) => {
  return headerValueMappers[headerType]?.(headerOptions) ?? headerOptions;
};

export const defaultConfig: SecurityConfig = {
  headers: {
    crossOriginResourcePolicy: 'same-origin',
    crossOriginOpenerPolicy: 'same-origin',
    crossOriginEmbedderPolicy: 'require-corp',
    contentSecurityPolicy: {
      'base-uri': ["'self'"],
      'font-src': ["'self'", 'https:', 'data:'],
      'form-action': ["'self'"],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': true,
    },
    originAgentCluster: '?1',
    referrerPolicy: 'no-referrer',
    strictTransportSecurity: {
      maxAge: 15552000,
      includeSubdomains: true,
    },
    xContentTypeOptions: 'nosniff',
    xDNSPrefetchControl: 'off',
    xDownloadOptions: 'noopen',
    xFrameOptions: 'SAMEORIGIN',
    xPermittedCrossDomainPolicies: 'none',
    xXSSProtection: '0',
    permissionsPolicy: {
      camera: ['()'],
      'display-capture': ['()'],
      fullscreen: ['()'],
      geolocation: ['()'],
      microphone: ['()'],
    },
  },
};

export const nextSecurity = (config: SecurityConfig = defaultConfig) => {
  return {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: generateSecurityHeaders(config.headers),
        },
      ];
    },
  };
};

export const generateSecurityHeaders = (
  headers: SecurityHeaders = defaultConfig.headers
) => {
  const headersArray: SecurityHeader[] = [];
  for (const header in headers) {
    const headerOptions = headers[header];
    if (headerOptions) {
      headersArray.push({
        key: SECURITY_HEADER_NAMES[header],
        value: getHeaderValueFromOptions(
          header as keyof SecurityHeaders,
          headerOptions
        ),
      });
    }
  }

  return headersArray;
};
