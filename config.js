// warning:
// next/config is a stateful module, it's only initialized once Next.js is initialized. It's generally not recommended to use it anywhere other than components/pages, because it depends on Next being initialized. Alternatively you can require('./next.config.js') and read the values that way.
const { publicRuntimeConfig = {} } = require("./next.config.js");
console.log("publicRuntimeConfig", publicRuntimeConfig);

const {
    APP_NAME,
    FB_APP_ID: FB_ID,
    DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT,
} = publicRuntimeConfig;

const IS_PROD = process.env.NODE_ENV === "production";
console.log("IS_PROD", IS_PROD);

const API = IS_PROD
    ? "https://vocariza.herokuapp.com/api"
    : "http://localhost:5002/api";
console.log("API", API);
const DOMAIN = IS_PROD ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;
const DOMAIN_PROD = DOMAIN_PRODUCTION;
const FB_APP_ID = FB_ID;

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
