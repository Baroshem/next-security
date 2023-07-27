/** @type {import('next').NextConfig} */
const { createHeaders, headers } = require('../build/main/index');

const nextConfig = {
  ...headers(),
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
