import { AddItem } from "../../domain/entities/IItems";
import { ItemRepository } from "../../domain/repositories/itemRepository";
import uploadImage from "../../utils/upload";



export class ItemService {
    private itemRepo: ItemRepository

    constructor() {
        this.itemRepo = new ItemRepository();
    }

    async AddItem(data: AddItem, file: Express.Multer.File | undefined) {
        try {
            const imageUpload = await uploadImage(file);
            if (imageUpload) {
                const result = await this.itemRepo.addItem(imageUpload, data);
                if (result) {
                    return { success: true, message: 'Blog successfully created.' };
                } else {
                    return { success: false, message: 'Blog creation failed. Please try again later.' };
                }
            } else {
                return { success: false, message: 'Image upload failed. Please try again later.' };
            }
        } catch (error) {
            console.error('Error in AddItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async editBlog(data: AddItem, file: Express.Multer.File | undefined) {
        try {
            let imageUpload = null;
            if (file) {
                imageUpload = await uploadImage(file);
            }
            const result = await this.itemRepo.editBlog(data, imageUpload);
            if (result.success) {
                return { success: true, message: 'Blog successfully edited.' };
            } else {
                return { success: false, message: 'Blog edit failed. Please try again later.' };
            }
        } catch (error) {
            console.error('Error in editBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getItems() {
        try {
            const result = await this.itemRepo.getItems()
            if (result) {
                return { success: true, message: 'Blog details fetched successful', itemData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getItem(itemId:string) {
        try {
            const result = await this.itemRepo.getItem(itemId)
            if (result) {
                return { success: true, message: 'Blog details fetched successful', itemData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async searchItems(data:string) {
        try {
            const result = await this.itemRepo.searchItems(data)
            if (result) {
                return { success: true, message: 'Customer search details fetched successful', customerData: result }
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

    async deleteItem(itemId: string) {
        try {
            const result = await this.itemRepo.deleteItem(itemId);
            if (result.acknowledged) {
                return { success: true, message: 'Item deleted successful', data: result }
            }
            return { success: false, message: 'Failed to delete item.' };
        } catch (error) {
            console.error('Error in deleteItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

}