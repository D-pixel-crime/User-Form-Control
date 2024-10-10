import express from "express";
import { createCustomer } from "../../controllers/postControllers/createCustomer.js";
import { authenticate } from "../authHandlers/auth.js";

const postRouter = express.Router();

postRouter.post("/create-customer", authenticate, createCustomer);

export { postRouter };
