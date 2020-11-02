const express = require("express");
const path = require("path");
const formData = require("express-form-data");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config(); // n4
require("./utils/globalHelpers");

//Init Express
const app = express();

// protect app with secure headers
app.use(helmet());
app.use(helmet.hidePoweredBy());

// compress all responses
app.use(compression());

const ENVIRONMENT = process.env.NODE_ENV || "development";
const isProduction = ENVIRONMENT === "production";
console.log("env", ENVIRONMENT);

// DATABASE
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, //Applied after DeprecationWarning and goal: new Server Discover and Monitoring engine || // comment this out when this error occurs: MongoTimeoutError: Server selection timed out after 30000 ms || || But be aware that things can not work properly
    useFindAndModify: false, // DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
    keepAlive: true,
};

mongoose
    .connect(process.env.MONGO_KEY, options)
    .then(() => console.log(`MongoDB Connected...`))
    .catch((err) => console.log(err));
// END DATABASE

// MIDDLEWARES
app.use(express.json()); //n1
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse()); // for images and multimedia in forms.
app.use(cors()); //n2

// routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/email", require("./routes/email"));
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/database", require("./routes/database"));
// app.use("/api/notification", require("./routes/notification"));
// app.use("/api/task", require("./routes/user/task"));
// app.use("/api/sms", require("./routes/sms"));
// app.use("/api/pay", require("./routes/pay"));
// app.use("/api/pro", require("./routes/pro"));
// END MIDDLEWARES

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/* ARCHIVES
app.use('/api/finance', require('./routes/finance'));
app.use('/api/staff-booking', require('./routes/staffBooking'));

 */

// NOTES
// n1: bodyparser middleware - Allow the app to accept JSON on req.body || replaces body-parser package
// you can also includes "app.use(express.urlencoded({extended: false}))"
// n2: this was used before:
/*
// CORS - configure an Express server with CORS headers (because the React app is going to be published in a different port), JSON requests, and /api as the path
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// });
 */
// n3 : resource: https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// prior setting:
/* app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + 'client/build/index.html')) // the "not found" issue may be occured becase of this path. client requires a slash before.
// })
n4: environment varibles works everywhere with dotenv, including controllers
*/

/* ARCHIVES
// Serve static files such as images, CSS files, and JavaScript files for the React frontend <app></app>
isProduction && app.use(express.static(path.join(__dirname, "client/build")));

// Working with next.js on frontend
// This solves the "Not found" issue when loading an URL other than index.html.
isProduction &&
    app.get("/*", (req, res) => {
        //n3
        res.sendFile(
            path.join(__dirname + "/client/build/index.html"),
            (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            }
        );
    });

*/
