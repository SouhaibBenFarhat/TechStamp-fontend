import { Injectable } from '@angular/core';
import { User, Address } from '../models/user';
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
            this.user.firstTime = data.data.firstTime;
            this.user.description = data.data.description;
            this.user.countryCode = data.data.countryCode;
            this.user.role = data.data.role;
            this.user.token = data.data.token;
            this.user.profilePictureUrl = data.data.profilePictureUrl;
            if ((data.data.personalDetail != null) && (data.data.personalDetail != undefined)) {
                this.user.personalDetail.date = data.data.personalDetail.date;
                this.user.personalDetail.day = data.data.personalDetail.day;
                this.user.personalDetail.firstname = data.data.personalDetail.firstname;
                this.user.personalDetail.gender = data.data.personalDetail.gender;
                this.user.personalDetail.lastname = data.data.personalDetail.lastname;
                this.user.personalDetail.month = data.data.personalDetail.month;
                this.user.personalDetail.phone = data.data.personalDetail.phone;
                this.user.personalDetail.year = data.data.personalDetail.year;
            }
            if ((data.data.addresses != null) && (data.data.addresses != undefined) && (data.data.addresses.length > 0) && (Array.isArray(data.data.addresses))) {
                this.user.addresses = new Array<Address>();
                for (let i = 0; i < data.data.addresses.length; i++) {
                    let address = new Address();
                    address.address = data.data.addresses[i].address;
                    address.code = data.data.addresses[i].code;
                    address.indication = data.data.addresses[i].indication;
                    address.region = data.data.addresses[i].region;
                    address.state = data.data.addresses[i].state;
                    this.user.addresses.push(address);
                }
            }

            console.log(this.user);

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