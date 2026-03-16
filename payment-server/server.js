require("dotenv").config();
 
const express = require("express");
const cors = require("cors");
 
const paymentRoutes = require("./routes/paymentRoutes");
 const { razorpayWebhook } = require("./controllers/webhookController");
 
const app = express();
 app.post("/api/payment/webhook",express.raw({type:"application/json"}),razorpayWebhook);
          
app.use(cors());
app.use(express.json());
 
app.use("/api/payment", paymentRoutes);
 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
