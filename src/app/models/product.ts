import { Property } from "./property";

export class Product {
    id: string;
    name: string;
    secondName: string;
    description: string;
    date: string;
    image: string;
    price: number;
    reduction: boolean;
    newPrice: number;
    currency: string;
    largeImage: string;
    categoryId: string;
    properties: Array<Property>;
    images: Array<string>;

    constructor() {
        this.properties = new Array<Property>()
        this.images = new Array<string>();
    }

}