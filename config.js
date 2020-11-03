import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

/*
Warning:
Runtime configuration won't be available to any page (or component in a page) without getInitialProps.
 */

const { APP_NAME: APP_N, FB_APP_ID: FB_ID } = publicRuntimeConfig;

const PRODUCTION = process.env.NODE_ENV === "production";

const API_PRODUCTION = "https://vocariza.herokuapp.com/api";
const API_DEVELOPMENT = "http://localhost:5002/api";
const DOMAIN_PRODUCTION = "https://vocariza.com";
const DOMAIN_DEVELOPMENT = "https://localhost:3001";

export const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;
export const DOMAIN = PRODUCTION ? DOMAIN_PRODUCTION : DOMAIN_DEVELOPMENT;

export const APP_NAME = APP_N;
export const FB_APP_ID = FB_ID;
