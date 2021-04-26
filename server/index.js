const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressValidation = require('express-validation');
const routes = require('./routes');
const APIError = require("./helpers/APIError");
const httpStatus = require("http-status");

dotenv.config();

// connect with database
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, ()=>console.log("app connected to db!"));

const app = express();

// set morgan logs onto the server...
app.use(logger(`\x1b[37m\x1b[7m :date \x1b[0m \x1b[33m\x1b[1m:status\x1b[0m \x1b[2m:url\x1b[0m \x1b[1m\x1b[33m:method\x1b[0m :res[content-length] - :response-time ms`));

// set body parse
app.use(bodyParser.json());

// set cors
app.use(cors());

// api routes
app.use('/api', routes);

// validation
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.details.body[0].message;
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.name === 'UnauthorizedError' ? true : err.isPublic);
        return next(apiError);
    }
    return next(err);
});

app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND, true);
    return next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            message: err.isPublic ? err.message : httpStatus[err.status]
        }
    });
})

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT,()=>console.log(`app is running on port - ${PORT}`));