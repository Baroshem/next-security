import { defaultHeaders } from './headers';
import {
  SECURITY_HEADER_NAMES,
  SecurityHeader,
  SecurityHeaders,
} from './types';
import { defuReplaceArray, getHeaderValueFromOptions } from './utils';

export const headers = (securityHeaders: SecurityHeaders) => {
  return {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: createHeaders(securityHeaders),
        },
      ];
    },
    poweredByHeader: defaultHeaders.xPoweredBy,
  };
};

export const createHeaders = (headers: SecurityHeaders) => {
  const localHeaders: SecurityHeaders = !headers
    ? defaultHeaders
    : defuReplaceArray({ ...headers }, { ...defaultHeaders });

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
