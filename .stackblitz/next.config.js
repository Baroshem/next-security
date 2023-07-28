/** @type {import('next').NextConfig} */
const { createHeaders, headers } = require('next-security');

const nextConfig = {
  ...headers({
    // The following is only necessary for Stackblitz as it does not work by default.
    crossOriginResourcePolicy: 'cross-origin',
    contentSecurityPolicy: false,
    xFrameOptions: false,
  }),
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: createHeaders(),
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
