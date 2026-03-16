const crypto = require("crypto");
function verifyPaymentSignature(orderId, paymentId, signature) {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;

}
module.exports = verifyPaymentSignature;