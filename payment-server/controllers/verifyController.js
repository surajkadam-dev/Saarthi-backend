const verifySignature = require("../utils/verifySignature.js");
 
exports.verifyPayment = async (req, res) => {
 
  try {
 
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      parcelId
    } = req.body;
 
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
 
    if (!isValid) {
      return res.status(400).json({ success: false });
    }
 
    // TODO: update Firestore payment status here
 
    res.json({
      success: true,
      paymentId: razorpay_payment_id
    });
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};