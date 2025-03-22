import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailUser = import.meta.env.VITE_EMAIL_USER;
const emailPass = import.meta.env.VITE_EMAIL_PASS;

// Configure transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

/**
 * Sends an email with an Excel file attachment.
 * @param {string} recipient - The recipient's email address.
 * @param {string} filename - The name of the attached file.
 * @param {string} fileData - Base64-encoded file content.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendEmailWithAttachment = async (recipient, filename, fileData) => {
    try {
        const mailOptions = {
            from: emailUser,
            to: recipient,
            subject: "Your Requested Report",
            text: "Please find your report attached.",
            attachments: [
                {
                    filename,
                    content: fileData,
                    encoding: "base64",
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, message: "Email sending failed." };
    }
};
