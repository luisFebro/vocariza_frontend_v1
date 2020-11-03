import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};
console.log("publicRuntimeConfig", publicRuntimeConfig);
console.log("publicRuntimeConfig.NODE_ENV", publicRuntimeConfig.NODE_ENV);
console.log("publicRuntimeConfig.NODE_ENV", process.env.NODE_ENV);

const {
    APP_NAME: APP_N,
    FB_APP_ID: FB_ID,
    PRODUCTION,
    API_PRODUCTION,
    API_DEVELOPMENT,
    DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT,
} = publicRuntimeConfig;

export const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;
export const DOMAIN = PRODUCTION ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;

export const APP_NAME = APP_N;
export const FB_APP_ID = FB_ID;
