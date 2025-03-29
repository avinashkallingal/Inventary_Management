import Item from "../../persistance/model/mongoDB/itemModel";
import { AddItem } from "../../../domain/entities/IItems";
import { v4 as uuidv4 } from 'uuid';

export class ItemRepository {
    async addItem(image: string, data: AddItem) {
        const generateItemId = (): string => {
            return Math.floor(parseInt(uuidv4().replace(/\D/g, '').substring(0, 4)) % 9000 + 1000).toString();
        };
        try {
            const createItem = new Item({
                itemId: generateItemId(), 
                itemName: data.itemName,
                category: data.category,
                quantity: data.quantity,
                price: data.price,
                description: data.description,
                image: image,
            });
            

            const itemData = await createItem.save()
            return itemData
        } catch (error) {
            console.error('Error adding blog:', error);
            throw new Error('An error occurred while adding blog. Please try again later.');
        }
    }

    async editBlog(data: AddItem, image: string | null) {
        try {
            const updateFields: AddItem = {
                itemName: data.itemName,
                category: data.category,
                description: data.description,
                price:data.price,
                quantity: data.quantity,
            };

            if (image) {
                updateFields.image = image;
            }

            const result = await Item.updateOne({ itemId: data.id }, { $set: updateFields });

            if (result.modifiedCount === 1) {
                return { success: true };
            } else {
                return { success: false, message: "No changes were made." };
            }
        } catch (error) {
            console.error('Error editing blog:', error);
            throw new Error('An error occurred while editing the blog. Please try again later.');
        }
    }


    async getItems() {
        try {
            const items = await Item.find().sort({ _id: -1 });
            return items
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error('An error occurred while fetching blogs. Please try again later.');
        }
    }

    async getItem(itemId:string) {
        try {
            const item = await Item.find({_id:itemId});
            return item
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error('An error occurred while fetching blogs. Please try again later.');
        }
    }


    async searchItems(search: string) {
        try {
            console.log(search," search string on customer repo")
            const items = await Item.find({
                $or: [
                    { itemId: { $regex: `^${String(search)}`, $options: "i" } }, // Match ID starting with input
                    { itemName: { $regex: `^${search}`, $options: "i" } }, // Match name starting with input
                ],
            }).sort({ _id: -1 });
    
            return items;
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

    async deleteItem(itemId: string) {
        try {
            const deleteItem = await Item.deleteOne({ _id: itemId });
            return deleteItem
        } catch (error) {
            console.error('Error fetching deleteBlog:', error);
            throw new Error('An error occurred while fetching user blogs. Please try again later.');
        }
    }
}