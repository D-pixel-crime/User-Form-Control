import { Customer } from "../../models/Customer.js";
import "colors";
import { createPDF } from "../../utils/createPDF.js";
import path from "path";
import fs from "fs";
import { Log } from "../../models/Log.js";
import axios from "axios";

const __dirname = path.resolve();

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const COMPANY_NAME = process.env.COMPANY_NAME;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

export const createCustomer = async (req, res) => {
  const id = req.user.id;
  const { name, email, countryCode, number, country, state, city } = req.body;

  try {
    const isSubmitted = await Customer.findOne({ user: id });
    if (isSubmitted) {
      return res.status(400).json({ message: "Customer already created." });
    }

    const newCustomer = await Customer.create({
      user: id,
      name,
      email,
      phone: {
        countryCode,
        number: Number(number),
      },
      location: {
        country,
        state,
        city,
      },
    });

    const pdfBuffer = await createPDF(newCustomer);

    const pdfDir = path.join(__dirname, "/pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }
    const pdfPath = path.join(pdfDir, `${id}.pdf`);

    console.log(`PDF created at ${pdfPath}`.bgGreen);

    fs.writeFileSync(pdfPath, pdfBuffer);

    const whatsappMessage = `Hello Mr ${name},\n\nThis message is to inform you that you have been successfully added as a customer at ${COMPANY_NAME}.\nPlease verify your details if they are correct or they need to be changed.\n\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${number}\nLocation: ${city}, ${state}, ${country}\n\nIf the details given are correct, please reply as “CORRECT”. If any changes need to be made, reply as “To be Changed”.\n\nPlease reply within 48 hrs of receiving this message or we will assume your reply as “CORRECT”.\n\nThanks and regards,\nTeam ${COMPANY_NAME}`;
    const whatsappLink = `${WHATSAPP_API_URL}${encodeURIComponent(
      whatsappMessage
    )}`;

    await Log.create({
      user: id,
      action: "Customer created",
    });

    if (WEBHOOK_URL) {
      await axios.post(`${WEBHOOK_URL}/api/webhooks/customer-created`, {
        event: "Customer Created",
        customer: {
          id: newCustomer._id,
          name: newCustomer.name,
          email: newCustomer.email,
          phone: newCustomer.phone,
          location: newCustomer.location,
        },
        actionBy: id,
        timestamp: new Date(),
      });
      console.log(`Webhook notification sent successfully.`.bgGreen);
    } else {
      console.log(`Webhook URL not configured.`.bgYellow);
    }

    return res.status(201).json({
      message: "Customer created successfully.",
      whatsappLink,
    });
  } catch (error) {
    console.log(`Error during customer creation: ${error}`.bgRed);
    return res.status(500).json({ message: "Error during customer creation." });
  }
};
