import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Article } from "../models/article";
import { WishList } from "../models/wishList";

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
            product.categoryId = data.categoryId;
            if (data.properties != undefined) {
                for (let i = 0; i < data.properties.length; i++) {
                    product.properties.push(data.properties[i]);
                }
            }
            if (data.images != undefined) {
                for (let i = 0; i < data.images.length; i++) {
                    product.images.push(data.images[i]);
                }
            }
            this.brandJsonToObject(data.brand).then((data) => {
                product.brand = data;
            });
            resolve(product);
        });
    }

    brandJsonToObject(data): any {
        let brand = new Brand();
        return new Promise((resolve, reject) => {
            brand.id = data._id;
            brand.date = data.date;
            brand.description = data.description;
            brand.image = data.image;
            brand.name = data.name;
            brand.logo = data.logo;
            brand.productsNumber = data.productsNumber;
            resolve(brand);
        }
        )

    }

    categoryJsonToObject(data): any {

        let category = new Category();
        return new Promise((resolve, reject) => {
            category.id = data._id;
            category.date = data.date;
            category.description = data.description;
            category.image = data.image;
            category.logo = data.logo;
            category.name = data.name;
            category.productsNumber = data.productsNumber;
            resolve(category);
        });

    }

    articleJsonToObject(data): any {
        let article = new Article();
        return new Promise((resolve, reject) => {
            article.source.id = data.source.id;
            article.source.name = data.source.name;
            article.author = data.author;
            article.title = data.title;
            article.description = data.description;
            article.url = data.url;
            article.urlToImage = data.urlToImage;
            article.publishedAt = data.publishedAt

            resolve(article);
        });
    }

    wishListJsonToObject(data): any {
        let wishList = new WishList();
        return new Promise((resolve, reject) => {
            wishList.id = data._id;
            wishList.productId = data.productId;
            wishList.userId = data.userId;
            resolve(wishList);
        });
    }

}