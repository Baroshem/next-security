/** @type {import('next').NextConfig} */
const { nextSecurity } = require('../build/main/index');
const nextConfig = {
  ...nextSecurity(),
};

module.exports = nextConfig;
