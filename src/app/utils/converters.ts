import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';

@Injectable()
export class Converters {

    user: User = new User();

    constructor() { }

    userJsonToObject(data): any {
        return new Promise((resolve, reject) => {
            this.user._id = data.data._id;
            this.user.email = data.data.email;
            this.user.firstname = data.data.firstname;
            this.user.lastname = data.data.lastname;
            this.user.firstTime = data.data.firstTime;
            this.user.description = data.data.description;
            this.user.countryCode = data.data.countryCode;
            this.user.role = data.data.role;
            this.user.token = data.data.token;
            resolve(this.user);
        });

    }

    productJsonToObject(data): any {
        let product: Product = new Product();
        return new Promise((resolve, reject) => {
            product.id = data._id;
            product.name = data.name;
            product.secondName = data.secondName;
            product.description = data.description;
            product.image = data.image;
            product.price = data.price;
            product.reduction = data.reduction;
            product.currency = data.currency;
            product.date = data.date;
            product.largeImage = data.largeImage;
            resolve(product);
        });
    }

}