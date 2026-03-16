const express = require("express");
 
const router = express.Router();
 
const { createOrder } = require("../controllers/orderController");
const { verifyPayment } = require("../controllers/verifyController");
const { razorpayWebhook } = require("../controllers/webhookController");
 
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook", razorpayWebhook);
 
module.exports = router;