import { Request, Response } from "express";
import { ReportService } from '../../application/useCases/report';
import { sendEmailWithAttachment } from "../../application/services/email/exportMailer";

class ReportController {
    private ReportService: ReportService;

    constructor() {
        this.ReportService = new ReportService();
    }

    getSalesReport = async (req: Request, res: Response) => {
        try {
           
            const result = await this.ReportService.getSalesReport()
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message ,report:result.report})
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in addBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    

    getItemsReport = async (req: Request, res: Response) => {
        try {
           
            const result = await this.ReportService.getItemsReport()
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message ,report:result.report})
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in addBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }
    

    getCustomerLedger = async (req: Request, res: Response) => {
        try {
            const data=req.query.id as string
            console.log(data," ledger data input %%%%%%%%%%%")
            const result = await this.ReportService.getCustomerLedger(data)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, report: result.report })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }


    
    getOrders = async (req: Request, res: Response) => {
        try {
            const result = await this.ReportService.getOrders()
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.itemData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }


    sendEmail = async (req: Request, res: Response) => {
        try {
            const { recipient, filename, fileData } = req.body;

    if (!recipient || !filename || !fileData) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const result = await sendEmailWithAttachment(recipient, filename, fileData);

            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

  

}

export const reportController = new ReportController();