/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    GRAPHQL_END_POINT: process.env.GRAPHQL_END_POINT,
  },
  images: {
    domains: ['denitz-media-dev.s3.ap-northeast-1.amazonaws.com'],
  },
};
