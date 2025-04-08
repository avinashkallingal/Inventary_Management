// type CustomerInfo = { name: string; phone: number };
// type itemAdd={
//     _id?: string;
//     itemId?:string;
//     itemName: string;
//     category: string;
//     quantity: number;
//     price: number;
//     description: string;
//     image?: string;
// }
// export interface IOrder {
//     _id?: string;
//     orderId:String;
//     customerId: CustomerInfo | string; // Can be an object or a string
//     userId: string;
//     items: [{
//         items: itemAdd;  // Reference to Item collection
//         quantity: number;
//     }];
//     totalPrice: number;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

export interface CustomerInfo {
    name: string;
    phone: number;
  }
  
  export interface ItemDetails {
   
    
    _id?: string;
        itemId?:string;
        itemName: string;
        category: string;
        quantity: number;
        price: number;
        description: string;
        image?: string;
  }
  
  export interface OrderItem {
    item: ItemDetails; // instead of itemId
    quantity: number;
  }
  
  export interface IOrder {
    _id: string;
    orderId: string;
    customerId: CustomerInfo | string; // could be populated or just an ID
    userId?: string;
    items: OrderItem[];
    totalPrice: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
  