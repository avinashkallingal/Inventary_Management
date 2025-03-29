import mongoose, { Schema, Document } from 'mongoose';

interface IItem extends Document {
    itemName: string;
    category: string;
    description: string;
    quatity:number;
    price: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const itemSchema: Schema = new Schema(
    {
        itemId: {
            type: String,
            required: true,
            trim: true,
        },
        itemName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
       
        category: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const Item = mongoose.model<IItem>('Item', itemSchema);
export default Item;
