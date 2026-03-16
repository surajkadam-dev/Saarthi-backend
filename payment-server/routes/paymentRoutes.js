const express = require("express");
 
const router = express.Router();
 
const { createOrder } = require("../controllers/orderController");
const { verifyPayment } = require("../controllers/verifyController");

 
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

 
module.exports = router;
