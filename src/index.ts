import { defaultConfig } from './defaultConfig';
import {
  SECURITY_HEADER_NAMES,
  SecurityConfig,
  SecurityHeader,
  SecurityHeaders,
} from './types';
import { defuReplaceArray, getHeaderValueFromOptions } from './utils';

export const nextSecurity = (config: SecurityConfig) => {
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

export const generateSecurityHeaders = (headers: SecurityHeaders) => {
  const localHeaders: SecurityHeaders = !headers
    ? defaultConfig.headers
    : defuReplaceArray({ ...headers }, { ...defaultConfig.headers });

  const headersArray: SecurityHeader[] = [];
  for (const header in localHeaders) {
    const headerOptions = localHeaders[header];
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
