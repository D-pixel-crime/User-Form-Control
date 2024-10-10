import "colors";
import { Customer } from "../../models/Customer.js";

export const checkCustomer = async (req, res) => {
  const id = req.user.id;
  try {
    const customer = await Customer.findOne({ user: id });
    if (customer) {
      return res.status(200).json({ message: "Customer found." });
    }
    return res.status(200).json({ message: "Not Found" });
  } catch (error) {
    console.log(`Error during customer check: ${error}`.bgRed);
    return res.status(500).json({ message: "Error during customer check." });
  }
};
