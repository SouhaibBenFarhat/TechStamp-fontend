import { Property } from "./property";
import { Brand } from "./brand";

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
    brand: Brand;

    constructor() {
        this.properties = new Array<Property>()
        this.images = new Array<string>();
        this.brand = new Brand();
    }

}