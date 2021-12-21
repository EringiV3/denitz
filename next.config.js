/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    GRAPHQL_END_POINT: process.env.GRAPHQL_END_POINT,
    MEDIA_HOST: process.env.MEDIA_HOST,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    NEXT_IMAGE_DOMAINS: process.env.NEXT_IMAGE_DOMAINS,
  },
  images: {
    domains: process.env.NEXT_IMAGE_DOMAINS.split(','),
  },
};
