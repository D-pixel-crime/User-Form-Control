import express from "express";
import { authenticate } from "../authHandlers/auth.js";
import { checkCustomer } from "../../controllers/getControllers/checkCustomer.js";

const getRouter = express.Router();

getRouter.get("/check-customer", authenticate, checkCustomer);

export { getRouter };
