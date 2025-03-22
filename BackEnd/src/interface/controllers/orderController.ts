import { Request, Response } from "express";
import { OrderService } from '../../app/useCases/order';

class OrderController {
    private OrderService: OrderService;

    constructor() {
        this.OrderService = new OrderService();
    }

    addOrder = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const file = req.file;
            const result = await this.OrderService.AddOrder(data)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in addBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

        getOrders = async (req: Request, res: Response) => {
        try {
            const result = await this.OrderService.getOrders()
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

   
}

export const orderController = new OrderController();