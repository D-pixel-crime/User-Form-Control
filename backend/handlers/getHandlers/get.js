import express from "express";
import { authenticate } from "../authHandlers/auth.js";
import { checkCustomer } from "../../controllers/getControllers/checkCustomer.js";
import { getLogs } from "../../controllers/getControllers/getLogs.js";
import { isAdmin } from "../../controllers/getControllers/isAdmin.js";

const getRouter = express.Router();

getRouter.get("/check-customer", authenticate, checkCustomer);
getRouter.get("/logs/:page", authenticate, getLogs);
getRouter.get("/isAdmin", authenticate, isAdmin);

export { getRouter };
