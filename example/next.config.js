/** @type {import('next').NextConfig} */
const {
  generateSecurityHeaders,
  nextSecurity,
} = require('../build/main/index');

const nextConfig = {
  ...nextSecurity(),
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: generateSecurityHeaders(),
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
