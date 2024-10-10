import { model, Schema } from "mongoose";

const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
});

export const Log = model("Log", LogSchema);
