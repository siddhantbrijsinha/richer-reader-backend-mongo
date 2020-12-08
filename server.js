"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectMongoose = require("./configs/db.config");
const morgan = require("morgan");
const config = require('./configs')

const app = express();

connectMongoose();

// cors
app.use(cors());

app.use(morgan("dev"));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./routes")(app);

const PORT = config.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server runnning at ${PORT}`);
});

