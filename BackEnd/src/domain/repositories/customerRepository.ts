import Customer from "../../models/customerModel";
import { ICustomer } from "../entities/ICustomer";
import { v4 as uuidv4 } from 'uuid';

export class CustomerRepository {
    async addCustomer(data: ICustomer) {
        const generateCustomerId = (): string => {
            return Math.floor(parseInt(uuidv4().replace(/\D/g, '').substring(0, 4)) % 9000 + 1000).toString();
        };
        try {
            const createCustomer = new Customer({
                customerId: generateCustomerId(), // Generate a unique customer ID
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                postalCode: data.postalCode,
            });
            

            const customerData = await createCustomer.save()
            return customerData
        } catch (error) {
            console.error('Error adding blog:', error);
            throw new Error('An error occurred while adding blog. Please try again later.');
        }
    }

    async editCustomer(data: ICustomer) {
        try {
            const updateFields: ICustomer = {
              
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                postalCode: data.postalCode,
            };

           

            const result = await Customer.updateOne({ _id: data.customerId }, { $set: updateFields });

            if (result.modifiedCount === 1) {
                return { success: true };
            } else {
                return { success: false, message: "No changes were made." };
            }
        } catch (error) {
            console.error('Error editing customer:', error);
            throw new Error('An error occurred while editing the customer. Please try again later.');
        }
    }


    async getCustomers() {
        try {
            const customers = await Customer.find().sort({ _id: -1 });
            return customers
        } catch (error) {
            console.error('Error fetching customer:', error);
            throw new Error('An error occurred while fetching blogs. Please try again later.');
        }
    }

    async getCustomer(customerId:string) {
        try {
            const customer = await Customer.find({_id:customerId});
            return customer
        } catch (error) {
            console.error('Error fetching customer:', error);
            throw new Error('An error occurred while fetching blogs. Please try again later.');
        }
    }

    async deleteCustomer(customerId: string) {
        try {
            const deleteCustomer = await Customer.deleteOne({ _id: customerId });
            return deleteCustomer
        } catch (error) {
            console.error('Error fetching deleteCustomer:', error);
            throw new Error('An error occurred while fetching user blogs. Please try again later.');
        }
    }

    
    async searchCustomers(search: string) {
        try {
            console.log(search," c")
            const customers = await Customer.find({
                $or: [
                    { phone: { $regex: `^${String(search)}`, $options: "i" } }, // Match ID starting with input
                    { name: { $regex: `^${search}`, $options: "i" } }, // Match name starting with input
                ],
            }).sort({ _id: -1 });
    
            return customers;
        } catch (error) {
            console.error("Error fetching customers:", error);
            throw new Error("An error occurred while fetching customers. Please try again later.");
        }
    }
    

    // async getUserBlog(userId: string) {
    //     try {
    //         const userBlog = await Blog.find({ userId: userId });
    //         return userBlog
    //     } catch (error) {
    //         console.error('Error fetching user blogs:', error);
    //         throw new Error('An error occurred while fetching user blogs. Please try again later.');
    //     }
    // }

    // async getSingleBlog(blogId: string) {
    //     try {
    //         const blogData = await Blog.findOne({ _id: blogId });
    //         return blogData
    //     } catch (error) {
    //         console.error('Error fetching user blogs:', error);
    //         throw new Error('An error occurred while fetching user blogs. Please try again later.');
    //     }
    // }


}