export default interface IItem {
    _id?: string;
    itemId?:string;
    itemName: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
    image?: string;
}
