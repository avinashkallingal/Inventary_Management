import Order from "../model/mongoDB/orderModel";
import { IOrder } from "../../../domain/entities/IOrder";
import { v4 as uuidv4 } from 'uuid';

export class OrderRepository {
    async addOrder( data: IOrder) {

        console.log(data," data in order repo&&&&&&&&&&&&&&")
        const generateItemId = (): string => {
            return Math.floor(parseInt(uuidv4().replace(/\D/g, '').substring(0, 4)) % 9000 + 1000).toString();
        };
        try {
            const createOrder = new Order({
                customerId: data.customerId, // Customer ID from request
                orderId:generateItemId(),
                items: data.items.map((item) => ({
                    item: item.itemId, // Reference to Item collection
                    quantity: item.quantity,
                })),
                totalPrice: data.items.reduce((sum, item) => sum + (500 * item.quantity), 0), // Calculate total order amount
            });
            
            

            const orderData = await createOrder.save()
            return orderData
        } catch (error) {
            console.error('Error adding blog:', error);
            throw new Error('An error occurred while adding blog. Please try again later.');
        }
    }

    // async editBlog(data: AddItem, image: string | null) {
    //     try {
    //         const updateFields: AddItem = {
    //             title: data.title,
    //             category: data.category,
    //             description: data.description,
    //         };

    //         if (image) {
    //             updateFields.image = image;
    //         }

    //         const result = await Blog.updateOne({ _id: data.id }, { $set: updateFields });

    //         if (result.modifiedCount === 1) {
    //             return { success: true };
    //         } else {
    //             return { success: false, message: "No changes were made." };
    //         }
    //     } catch (error) {
    //         console.error('Error editing blog:', error);
    //         throw new Error('An error occurred while editing the blog. Please try again later.');
    //     }
    // }


    // async getOrders() {
    //     try {
    //         const orders = await Order.find().sort({ _id: -1 });
    //         return orders
    //     } catch (error) {
    //         console.error('Error fetching items:', error);
    //         throw new Error('An error occurred while fetching blogs. Please try again later.');
    //     }
    // }

    async getOrders() {
        try {
            const orders = await Order.find()
                .sort({ _id: -1 })
                .populate({
                    path: "customerId", // Populate customer details
                    select: "name phone email", // Fetch only necessary fields
                })
                .populate({
                    path: "items.item", // Populate item details
                    select: "itemName price image", // Fetch item details
                });
    
            return orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw new Error("An error occurred while fetching orders. Please try again later.");
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

    // async deleteBlog(blogId: string) {
    //     try {
    //         const deleteBlog = await Blog.deleteOne({ _id: blogId });
    //         return deleteBlog
    //     } catch (error) {
    //         console.error('Error fetching deleteBlog:', error);
    //         throw new Error('An error occurred while fetching user blogs. Please try again later.');
    //     }
    // }
}