const crypto = require("crypto");
const db = require("../config/firebase");

exports.verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      parcelId
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

    await db.collection("parcels")
      .doc(parcelId)
      .update({
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paidAt: new Date()
      });

    res.json({
      success: true,
      paymentId: razorpay_payment_id
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};
