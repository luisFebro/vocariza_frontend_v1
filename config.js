import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const {
    APP_NAME: APP_N,
    FB_APP_ID: FB_ID,
    DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT,
} = publicRuntimeConfig;

const IS_PROD = process.env.NODE_ENV === "production";

export const API = IS_PROD
    ? "https://vocariza.herokuapp.com/api"
    : "http://localhost:5002/api";

export const DOMAIN = IS_PROD ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;

export const APP_NAME = APP_N;
export const FB_APP_ID = FB_ID;
