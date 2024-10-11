import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  googleId: {
    type: String,
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
  createdAt: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
  profilePic: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

export const User = model("User", UserSchema);
