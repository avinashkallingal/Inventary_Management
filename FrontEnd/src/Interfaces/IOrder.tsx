export interface IOrder {
    id?: string;
    orderId:String;
    customerId:string;
    userId: string;
    items: {
        itemId: string;  // Reference to Item collection
        quantity: number;
    }[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}