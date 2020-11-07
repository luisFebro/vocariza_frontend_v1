// warning:
// next/config is a stateful module, it's only initialized once Next.js is initialized. It's generally not recommended to use it anywhere other than components/pages, because it depends on Next being initialized. Alternatively you can require('./next.config.js') and read the values that way.
const { publicRuntimeConfig = {} } = require("./next.config.js");

const {
    APP_NAME: APP_N,
    FB_APP_ID: FB_ID,
    DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT,
} = publicRuntimeConfig;

const IS_PROD = process.env.NODE_ENV === "production";

const API = IS_PROD
    ? "https://vocariza.herokuapp.com/api"
    : "http://localhost:5002/api";

const DOMAIN = IS_PROD ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;
const DOMAIN_PROD = DOMAIN_PRODUCTION;

const FB_APP_ID = FB_ID;
const APP_NAME = APP_N;

module.exports = {
    API,
    DOMAIN,
    DOMAIN_PROD,
    FB_APP_ID,
    APP_NAME,
};

/* ARCHIVES
// import getConfig from "next/config";
// const { publicRuntimeConfig = {} } = getConfig() || {};
 */
