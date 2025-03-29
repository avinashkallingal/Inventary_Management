import Customer from "../model/mongoDB/customerModel";
import Order from "../model/mongoDB/orderModel";
import { IOrder } from "../../../domain/entities/IOrder";
import { v4 as uuidv4 } from 'uuid';

export class ReportRepository {
    async getSalesReport() {
        try {
            const report = await Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: "$totalPrice" },
                        totalOrders: { $sum: 1 },
                    },
                },
            ]);
    
            return report[0] || { totalSales: 0, totalOrders: 0 };
        } catch (error) {
            console.error("Error fetching sales report:", error);
            throw new Error("Error generating sales report.");
        }
    }

    async getCustomerLedger(customerId: string) {
        try {
        
            const ledger = await Order.find({ customerId })
                .sort({ createdAt: -1 })
                .populate("items.item", "itemName price")
                .select("orderId items totalPrice createdAt");
    
            return ledger;
        } catch (error) {
            console.error("Error fetching customer ledger:", error);
            throw new Error("Error generating customer ledger.");
        }
    }
    
    



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
    
    async getItemsReport() {
        try {
            const report = await Order.aggregate([
                { $unwind: "$items" }, // Break down order items
                {
                    $group: {
                        _id: "$items.item",
                        totalQuantity: { $sum: "$items.quantity" },
                    },
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "_id",
                        foreignField: "_id",
                        as: "itemDetails",
                    },
                },
                { $unwind: "$itemDetails" },
                {
                    $project: {
                        _id: 0,
                        itemName: "$itemDetails.itemName",
                        totalQuantity: 1,
                    },
                },
            ]);
    
            return report;
        } catch (error) {
            console.error("Error fetching items report:", error);
            throw new Error("Error generating items report.");
        }
    }
    

  
}