const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "./config/config.env" });
  }

  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  const payment = require('./routes/paymentRoute')

  app.use(payment)
  app.get("*", (req, res) => {
    res.send({"message": "welcome to api"});
  });


  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });
  
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  