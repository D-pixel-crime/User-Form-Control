import express from "express";
import "colors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/webhooks/customer-created", (req, res) => {
  const { event, customer, actionBy, timestamp } = req.body;

  console.log("Webhook received:");
  console.log(`Event: ${event}`);
  console.log(`Customer ID: ${customer.id}`);
  console.log(`Customer Name: ${customer.name}`);
  console.log(`Customer Email: ${customer.email}`);
  console.log(`Action By: ${actionBy}`);
  console.log(`Timestamp: ${timestamp}`);

  res.status(200).json({ message: "Webhook received successfully" });
});

app.listen(PORT, () => {
  console.log(`Webhook receiver running on port ${PORT}`);
});
