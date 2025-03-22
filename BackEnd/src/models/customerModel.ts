import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    customerId: string;
    name: string;
    phone: string;
    email?: string;
    address: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const customerSchema: Schema = new Schema(
    {
        customerId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            sparse: true, // Allows multiple customers with no email
            trim: true,
            lowercase: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        postalCode: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true // Automatically adds createdAt & updatedAt
    }
);

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
