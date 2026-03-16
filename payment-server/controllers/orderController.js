const razorpay = require("../config/razorpay");
const db = require("../config/firebase");

exports.createOrder = async (req, res) => {

  try {

    const { amount, parcelId } = req.body;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "parcel_" + Date.now(),
      notes: {
        parcelId: parcelId
      }
    });

    await db.collection("parcels")
      .doc(parcelId)
      .update({
        orderId: order.id,
        paymentStatus: "pending"
      });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
