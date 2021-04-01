const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes')

dotenv.config();

const app = express();

// set morgan logs onto the server...
app.use(logger(`\x1b[37m\x1b[7m :date \x1b[0m \x1b[33m\x1b[1m:status\x1b[0m \x1b[2m:url\x1b[0m \x1b[1m\x1b[33m:method\x1b[0m :res[content-length] - :response-time ms`));

// set body parse
app.use(bodyParser.json());

// set cors
app.use(cors());

// api routes
app.use('/api', routes);

const PORT = 3001;

app.get("/",(req,res)=>res.send("Hello World!!!"));

app.listen(PORT,()=>console.log(`Server is running on port - ${PORT}`));