// warning:
// next/config is a stateful module, it's only initialized once Next.js is initialized. It's generally not recommended to use it anywhere other than components/pages, because it depends on Next being initialized. Alternatively you can require('./next.config.js') and read the values that way.
// const { publicRuntimeConfig = {} } = require("./next.config.js");

const IS_PROD = process.env.NODE_ENV === "production";
// this needs to be here because gets undefined in next.config.js
const APP_NAME = "Vocariza";
const API = IS_PROD ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT;
const DOMAIN = IS_PROD ? "https://vocariza.com" : "https://localhost:3001";

const DOMAIN_PROD = "https://vocariza.com";
const FB_APP_ID = "123";

module.exports = {
    API,
    DOMAIN,
    DOMAIN_PROD,
    FB_APP_ID,
    APP_NAME,
};

/* ARCHIVES
// import getConfig from "next/config";
 */
