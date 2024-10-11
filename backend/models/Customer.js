import { model, Schema } from "mongoose";

const CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    countryCode: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
  location: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
});

export const Customer = model("Customer", CustomerSchema);
