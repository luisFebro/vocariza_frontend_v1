import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
console.log("publicRuntimeConfig", publicRuntimeConfig);

/*
Warning:
Runtime configuration won't be available to any page (or component in a page) without getInitialProps.
 */

const {
    APP_NAME: APP_N,
    PRODUCTION,
    API_PRODUCTION,
    API_DEVELOPMENT,
    DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT,
    FB_APP_ID: FB_ID,
} = publicRuntimeConfig;

export const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

export const APP_NAME = APP_N;

export const DOMAIN = PRODUCTION ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;

export const FB_APP_ID = FB_ID;

/*
Organize next.config.js file like this model:
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

const isDev = process.env.NODE_ENV === 'dev'

const withSassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    modules: true,
    importLoaders: 1,
    localIdentName: isDev ? '[name]__[local]--[hash:base64:5]' : '[sha1:hash:hex:4]',
  },
}

const nextConfig = {
  publicRuntimeConfig: {
    // config vars..
  },
}

const config = {
  ...withSassConfig,
  ...nextConfig,
  webpack: webpackConfig => webpackConfig,
}

module.exports = withCss(withSass(withImages(config)))

 */
