import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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
