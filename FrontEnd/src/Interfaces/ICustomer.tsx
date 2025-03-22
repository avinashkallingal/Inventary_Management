export interface ICustomer {
    _id?:string;
    customerId?: string;
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
