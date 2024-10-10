import { PDFDocument, rgb } from "pdf-lib";

export const createPDF = async (customer) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const { name, email, phone, location } = customer;

  page.drawText(`Customer Details`, {
    x: 50,
    y: 350,
    size: 30,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Name: ${name}`, { x: 50, y: 300 });
  page.drawText(`Email: ${email}`, { x: 50, y: 240 });
  page.drawText(`Phone: +${phone.countryCode} ${phone.number}`, {
    x: 50,
    y: 210,
  });
  page.drawText(
    `Location: ${location.city}, ${location.state}, ${location.country}`,
    { x: 50, y: 180 }
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
