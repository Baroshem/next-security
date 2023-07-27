import { createDefu } from 'defu';
import {
  ContentSecurityPolicyValue,
  PermissionsPolicyValue,
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

export const defuReplaceArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});
