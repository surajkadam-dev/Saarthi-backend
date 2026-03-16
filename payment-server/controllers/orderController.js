const razorpay = require("../config/razorpay.js");
 
exports.createOrder = async (req, res) => {
 
  try {
 
    const { amount } = req.body;
 
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "parcel_" + Date.now(),
    });
 
    res.json({
      orderId: order.id,
      amount: order.amount
    });
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};