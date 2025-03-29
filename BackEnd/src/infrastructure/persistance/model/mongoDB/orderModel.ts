
import mongoose, { Schema, Document } from 'mongoose';

// Define Order Item Interface
interface IOrderItem {
    item: mongoose.Schema.Types.ObjectId; // Reference to Item collection
    quantity: number;
}

// Define Order Interface
interface IOrder extends Document {
    customerId: mongoose.Schema.Types.ObjectId; // Reference to User
    items: IOrderItem[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Order Schema
const orderSchema: Schema = new Schema(
    {
       
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
       orderId: {
            type: String,
            required: true,
        },
        items: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // Ensures at least 1 quantity
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt & updatedAt
    }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;

