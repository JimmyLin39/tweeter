"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URL = "mongodb://localhost:27017/tweeter";

// sass setup
// Recompile .scss or .sass files automatically for connect and express based http servers.
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
console.log(__dirname);
app.use(sassMiddleware({

    /* Options */
    src: __dirname + '/../sass',
    dest: __dirname + '/../public/styles',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/styles'
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");

// connect MongoDB
MongoClient.connect(MONGODB_URL, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URL}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URL}`);

  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes); 
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
