import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_MAIL as string,
        pass: process.env.SMTP_PASSWORD as string,
    },
});

// Define an interface for the response
interface EmailResponse {
    success: boolean;
    message: string;
}

/**
 * Sends an email with an Excel file attachment.
 * @param recipient - The recipient's email address.
 * @param filename - The name of the attached file.
 * @param fileData - Base64-encoded file content.
 * @returns A promise that resolves to an EmailResponse object.
 */
export const sendEmailWithAttachment = async (
    recipient: string,
    filename: string,
    fileData: string
): Promise<EmailResponse> => {
    try {
        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.SMTP_MAIL as string,
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
