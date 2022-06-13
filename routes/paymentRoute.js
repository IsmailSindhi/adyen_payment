const express = require("express");
const {
  pay,
  
} = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment").post(pay);

module.exports = router;
