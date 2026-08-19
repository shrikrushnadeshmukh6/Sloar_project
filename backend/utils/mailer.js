// import nodemailer from "nodemailer";

// let transporter = null;

// function getTransporter() {
//   if (transporter) return transporter;
//   const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
//   if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

//   transporter = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: Number(SMTP_PORT) || 587,
//     secure: Number(SMTP_PORT) === 465,
//     auth: { user: SMTP_USER, pass: SMTP_PASS },
//   });
//   return transporter;
// }

// export async function notifyNewEnquiry(enquiry) {
//   const t = getTransporter();
//   if (!t) {
//     // No SMTP configured — enquiry is still saved to disk by the route handler.
//     return { sent: false, reason: "SMTP not configured" };
//   }

//   const to = process.env.NOTIFY_EMAIL_TO || process.env.SMTP_USER;
//   await t.sendMail({
//     from: `"Suryavan Solar Website" <${process.env.SMTP_USER}>`,
//     to,
//     subject: `New solar enquiry — ${enquiry.name} (${enquiry.city})`,
//     text: [
//       `Name: ${enquiry.name}`,
//       `Phone: ${enquiry.phone}`,
//       `Email: ${enquiry.email || "-"}`,
//       `City: ${enquiry.city}`,
//       `Property type: ${enquiry.propertyType}`,
//       `Monthly bill: ${enquiry.monthlyBill || "-"}`,
//       `Message: ${enquiry.message || "-"}`,
//       `Received: ${enquiry.receivedAt}`,
//     ].join("\n"),
//   });

//   return { sent: true };
// }
import nodemailer from "nodemailer";

let transporter = null;
let transporterPromise = null;

async function getTransporter() {
  if (transporter) return transporter;
  if (transporterPromise) return transporterPromise;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be configured");
  }

  const port = Number(SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  transporterPromise = transporter.verify().catch((error) => {
    transporter = null;
    transporterPromise = null;
    throw new Error(`SMTP connection failed: ${error.message}`);
  });

  await transporterPromise;
  return transporter;
}

export async function notifyNewEnquiry(enquiry) {
  const t = await getTransporter();
  const { SMTP_USER, NOTIFY_EMAIL_TO } = process.env;
  const adminEmail = NOTIFY_EMAIL_TO || SMTP_USER;

  await t.sendMail({
    from: `"Suryavan Solar Website" <${SMTP_USER}>`,
    to: adminEmail,
    subject: `New solar enquiry — ${enquiry.name} (${enquiry.city})`,
    text: [
      `Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      `Email: ${enquiry.email || "-"}`,
      `City: ${enquiry.city}`,
      `Property type: ${enquiry.propertyType}`,
      `Monthly bill: ${enquiry.monthlyBill || "-"}`,
      `Message: ${enquiry.message || "-"}`,
      `Received: ${enquiry.receivedAt}`,
    ].join("\n"),
  });

  // Customer confirmation is best-effort; the admin notification must succeed.
  if (enquiry.email) {
    try {
      await t.sendMail({
        from: `"Suryavan Solar" <${SMTP_USER}>`,
        to: enquiry.email,
        subject: `Thank you for contacting Suryavan Solar!`,
        text: `Hi ${enquiry.name},\n\nThank you for reaching out to Suryavan Solar. We have received your enquiry for ${enquiry.propertyType} solar installation in ${enquiry.city}.\n\nOur solar expert will contact you within 1 business day on your phone number (${enquiry.phone}).\n\nBest regards,\nSuryavan Solar Team`,
      });
    } catch (err) {
      console.error("Failed to send confirmation email to user:", err.message);
    }
  }

  return { sent: true };
}
