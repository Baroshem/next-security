import { SecurityHeaders } from './types';

export const defaultHeaders: SecurityHeaders = {
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
  xPoweredBy: false,
};
