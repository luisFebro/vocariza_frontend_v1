// const withCSS = require("@zeit/next-css");

module.exports = {
    publicRuntimeConfig: {
        APP_NAME: "Vocariza",
        PRODUCTION: process.env.NODE_ENV === "production",
        API_DEVELOPMENT: "http://localhost:5001/api",
        API_PRODUCTION: "https://vocariza.herokuapp.com/api",
        DOMAIN_DEVELOPMENT: "https://localhost:3001",
        DOMAIN_PRODUCTION: "https://vocariza.com",
        FB_APP_ID: "213",
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: "secret",
        secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
};

//withCSS({
//     publicRuntimeConfig: {
//         APP_NAME: 'SEOBLOG',
//         API_DEVELOPMENT: 'http://localhost:10000/api',
//         API_PRODUCTION: 'https://seoblog.com',
//         PRODUCTION: false,
//     }
// })
