import { Customer } from "../../models/Customer.js";
import "colors";
import { createPDF } from "../../utils/createPDF.js";
import path from "path";
import fs from "fs";
import { Log } from "../../models/Log.js";
import axios from "axios";

const __dirname = path.resolve();

const COMPANY_NAME = process.env.COMPANY_NAME;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const COMPANY_COUNTRY_CODE = process.env.COUNTRY_CODE;
const COMPANY_NUMBER = process.env.NUMBER;

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

    const whatsappMessage = `Hello ${COMPANY_NAME},\n\nI have received confirmation of my registration as a customer. Here are my details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${number}\nLocation: ${city}, ${state}, ${country}\n\nIf these details are correct, please confirm by replying “CORRECT”. If any changes are needed, please reply with the updated information.\n\nThank you,\n${name}`;

    const whatsappLink = `https://wa.me/${COMPANY_COUNTRY_CODE}${COMPANY_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    await Log.create({
      user: id,
      action: "Customer created",
    });

    if (WEBHOOK_URL) {
      await axios.post(
        `${WEBHOOK_URL}/api/webhooks/customer-created`,
        {
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
        },
        { withCredentials: true }
      );
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
