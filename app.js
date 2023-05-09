// Requiring all the important files and packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Routes = require("./Routes/routes");

//------------------------------------------------------------------------------------------//

// Setting the location for .env file
dotenv.config({ path: "./config.env" });

//------------------------------------------------------------------------------------------//

// App setup
const app = express();
app.use(express.json());

//------------------------------------------------------------------------------------------//

// Connecting to database and starting up the server
const DB = process.env.DB_STRING.replace("<password>", process.env.PASSWORD);
const port = process.env.PORT || 3000;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server started at port " + port);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(500);
  });

//------------------------------------------------------------------------------------------//

// Redirecting the requests
app.use(Routes);
