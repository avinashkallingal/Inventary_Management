import { ICustomer } from "../../domain/entities/ICustomer";
import { CustomerRepository } from "../../infrastructure/persistance/repository/customerRepository";
import uploadImage from "../../application/services/upload/upload";



export class CustomerService {
    private customerRepo: CustomerRepository

    constructor() {
        this.customerRepo = new CustomerRepository();
    }

    async AddCustomer(data: ICustomer) {
        try {
            
           
                const result = await this.customerRepo.addCustomer(data);
                if (result) {
                    return { success: true, message: 'Customer successfully created.' };
                } else {
                    return { success: false, message: 'Blog creation failed. Please try again later.' };
                }
           
        } catch (error) {
            console.error('Error in AddItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async editCustomer(data: ICustomer) {
        try {
         
            const result = await this.customerRepo.editCustomer(data);
            if (result.success) {
                return { success: true, message: 'customer successfully edited.' };
            } else {
                return { success: false, message: 'customer edit failed. Please try again later.' };
            }
        } catch (error) {
            console.error('Error in editBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async deleteCustomer(customerId: string) {
        try {
            const result = await this.customerRepo.deleteCustomer(customerId);
            if (result.acknowledged) {
                return { success: true, message: 'Blog deleted successful', data: result }
            }
            return { success: false, message: 'Failed to delete user Blog.' };
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getCustomers() {
        try {
            const result = await this.customerRepo.getCustomers()
            if (result) {
                return { success: true, message: 'Blog details fetched successful', customerData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getCustomer(customerId:string) {
        try {
            const result = await this.customerRepo.getCustomer(customerId)
            if (result) {
                return { success: true, message: 'Blog details fetched successful', customerData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    

    async searchCustomers(data:string) {
        try {
            const result = await this.customerRepo.searchCustomers(data)
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



}