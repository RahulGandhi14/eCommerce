const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressValidation = require('express-validation');
const routes = require('./routes');
const APIError = require("./helpers/APIError");

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
    if(err instanceof expressValidation.ValidationError){
        // validation error contains error which is an array of errors each containing message []
        const unifiedErrorMessage = err.errors.map(error => error.message.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    }
    return next(err);
})

const PORT = process.env.PORT || 3001;

app.get("/",(req,res)=>res.send("Hello World!!!"));

app.listen(PORT,()=>console.log(`app is running on port - ${PORT}`));