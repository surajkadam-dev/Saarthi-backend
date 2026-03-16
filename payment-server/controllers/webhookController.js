const crypto = require("crypto");
const db = require("../config/firebase");

exports.razorpayWebhook = async (req, res) => {

  try {

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", secret);

    shasum.update(req.body);

    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(req.body).event;

    if (event === "payment.captured") {

      const payment = JSON.parse(req.body).payload.payment.entity;

      const parcelId = payment.notes?.parcelId;

      if (parcelId) {

        await db.collection("parcels")
          .doc(parcelId)
          .update({
            paymentStatus: "paid",
            paymentId: payment.id,
            paidAt: new Date()
          });

      }

      console.log("Payment captured:", payment.id);

    }

    res.status(200).send("Webhook received");

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};
