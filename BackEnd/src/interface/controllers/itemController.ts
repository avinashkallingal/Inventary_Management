import { Request, Response } from "express";
import { ItemService } from '../../app/useCases/item';

class ItemController {
    private ItemService: ItemService;

    constructor() {
        this.ItemService = new ItemService();
    }

    addItem = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const file = req.file;
            const result = await this.ItemService.AddItem(data, file)
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

    updateItem = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const file = req.file;
            const result = await this.ItemService.editBlog(data, file);
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

    getItems = async (req: Request, res: Response) => {
        try {
            const result = await this.ItemService.getItems()
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

    getItem = async (req: Request, res: Response) => {
        try {
            const { itemId } = req.params; // Extract itemId from URL
            const result = await this.ItemService.getItem(itemId)
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


    searchItems = async (req: Request, res: Response) => {

        try {
            const data=req.query.search
            const result = await this.ItemService.searchItems(`${data}`)
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

    deleteItem = async (req: Request, res: Response) => {
        try {       
            const itemId = req.params.itemId;
                 const result = await this.ItemService.deleteItem(itemId);
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

}

export const itemController = new ItemController();