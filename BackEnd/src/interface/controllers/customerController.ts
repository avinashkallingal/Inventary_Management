import { Request, Response } from "express";
import { CustomerService } from '../../application/useCases/customer';

class CustomerController {
    private CustomerService: CustomerService;

    constructor() {
        this.CustomerService = new CustomerService();
    }

    addCustomer = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            // const file = req.file;
            const result = await this.CustomerService.AddCustomer(data)
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

    editCustomer = async (req: Request, res: Response) => {
        try {
            const data = req.body;
           
            const result = await this.CustomerService.editCustomer(data);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in editBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    getCustomers = async (req: Request, res: Response) => {
        try {
            const result = await this.CustomerService.getCustomers()
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.customerData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }


    getCustomer = async (req: Request, res: Response) => {
        try {
            const { customerId } = req.params;
            const result = await this.CustomerService.getCustomer(customerId)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.customerData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }


    searchCustomers = async (req: Request, res: Response) => {

        try {
            const data=req.query.search
            const result = await this.CustomerService.searchCustomers(`${data}`)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.customerData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    deleteCustomer = async (req: Request, res: Response) => {
        try {
            const customerId = req.params.customerId;
            const result = await this.CustomerService.deleteCustomer(customerId);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.data })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    // getUserBlog = async (req: Request, res: Response) => {
    //     try {
    //         const userId = req.params.id
    //         const result = await this.ItemService.getUserBlog(userId)
    //         console.log(result);
    //         if (result.success) {
    //             res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
    //         } else {
    //             res.json({ success: result.success, message: result.message })
    //         }
    //     } catch (error) {
    //         console.error('Error in getUserBlog:', error);
    //         res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    //     }
    // }

    // getSingleBlog = async (req: Request, res: Response) => {
    //     try {
    //         console.log(req.params.blogId, '-------------------blog id in backend')
    //         const blogId = req.params.blogId
    //         const result = await this.ItemService.getSingleBlog(blogId);
    //         if (result.success) {
    //             res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
    //         } else {
    //             res.json({ success: result.success, message: result.message })
    //         }
    //     } catch (error) {
    //         console.error('Error in getSingleBlog:', error);
    //         res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    //     }
    // }



}

export const customerController = new CustomerController();