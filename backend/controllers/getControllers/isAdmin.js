import "colors";
import { User } from "../../models/User.js";

export const isAdmin = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    if (!user.isAdmin) {
      console.log(`User is not an admin`.bgRed);
      return res.status(401).json({ message: "User is not an admin" });
    }

    return res.status(200).json({ message: "User is an admin", isAdmin: true });
  } catch (error) {
    console.log(`Error during admin validation: ${error}`.bgRed);
    return res.status(500).json({ message: error.message });
  }
};
