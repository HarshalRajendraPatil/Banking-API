const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Routes = require("./Routes/routes");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());

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

app.use(Routes);
