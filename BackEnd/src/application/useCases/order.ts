import { IOrder } from "../../domain/entities/IOrder";
import { OrderRepository } from "../../infrastructure/persistance/repository/orderRepository";
import uploadImage from "../../application/services/upload/upload";



export class OrderService {
    private orderRepo: OrderRepository

    constructor() {
        this.orderRepo = new OrderRepository();
    }

    async AddOrder(data: IOrder) {
        try {
          
          
                const result = await this.orderRepo.addOrder( data);
                if (result) {
                    return { success: true, message: 'Blog successfully created.' };
                } else {
                    return { success: false, message: 'Blog creation failed. Please try again later.' };
                }
         
        } catch (error) {
            console.error('Error in AddItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    // async editBlog(data: AddItem, file: Express.Multer.File | undefined) {
    //     try {
    //         let imageUpload = null;
    //         if (file) {
    //             imageUpload = await uploadImage(file);
    //         }
    //         const result = await this.itemRepo.editBlog(data, imageUpload);
    //         if (result.success) {
    //             return { success: true, message: 'Blog successfully edited.' };
    //         } else {
    //             return { success: false, message: 'Blog edit failed. Please try again later.' };
    //         }
    //     } catch (error) {
    //         console.error('Error in editBlog:', error);
    //         return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    //     }
    // }

    async getOrders() {
        try {
            const result = await this.orderRepo.getOrders()
            if (result) {
                return { success: true, message: 'Blog details fetched successful', itemData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    // async getUserBlog(userId: string) {
    //     try {
    //         const result = await this.itemRepo.getUserBlog(userId);
    //         if (result) {
    //             return { success: true, message: 'Blog details fetched successful', blogData: result }
    //         }
    //         return { success: false, message: 'Failed to fect user Blog data.' };
    //     } catch (error) {
    //         console.error('Error in getUserBlog:', error);
    //         return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    //     }
    // }

    // async getSingleBlog(blogId: string) {
    //     try {
    //         const result = await this.itemRepo.getSingleBlog(blogId);
    //         if (result) {
    //             return { success: true, message: 'Blog details fetched successful', blogData: result }
    //         }
    //         return { success: false, message: 'Failed to fect user Blog data.' };
    //     } catch (error) {
    //         console.error('Error in getUserBlog:', error);
    //         return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    //     }
    // }

    // async deleteBlog(blogId: string) {
    //     try {
    //         const result = await this.itemRepo.deleteBlog(blogId);
    //         if (result.acknowledged) {
    //             return { success: true, message: 'Blog deleted successful', blogData: result }
    //         }
    //         return { success: false, message: 'Failed to delete user Blog.' };
    //     } catch (error) {
    //         console.error('Error in deleteBlog:', error);
    //         return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    //     }
    // }

}