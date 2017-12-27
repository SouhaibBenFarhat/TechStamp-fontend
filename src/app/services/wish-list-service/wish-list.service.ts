import { Injectable, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishList } from "../../models/wishList";
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class WishListService {

  headers;
  wishLists = new Array<WishList>();
  wishListNumber = new EventEmitter<any>();
  onWishListChange = new EventEmitter<any>();


  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService) {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

  }

  getWishList(): any {

  }


  getAllWishList(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['wish-list'], { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
        this.wishLists = [];
        for (let i = 0; i < data.length; i++) {
          this.converter.wishListJsonToObject(data[i]).then((wishList: WishList) => {
            this.wishLists.push(wishList);
          });
        }
        resolve(this.wishLists);
      }, (error) => {
        reject(error);
      });
    });

  }
  addToWishList(productId: string): any {
    let wishList = new WishList();
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then((data) => {
        wishList.productId = productId;
        wishList.userId = data._id;
        this.http.post(this.global.urls['wish-list'], { productId: wishList.productId, userId: wishList.userId }, { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
          this.converter.wishListJsonToObject(data).then((wishList: WishList) => {
            this.wishLists.push(wishList);
            this.wishListNumber.emit(this.wishLists.length);
            this.onWishListChange.emit({ event: "add", productId: wishList.productId });
            resolve();
          })
        }, (err) => {
          reject(err);
          console.log(err);
        })
      }).catch((err) => {
        reject(err);
      });
    })
  }
  deleteFromWishList(productId: string, wishListId: string): any {
    return new Promise((resolve, reject) => {
      this.http.delete(this.global.urls['wish-list-delete'] + wishListId, { headers: this.headers }).subscribe(() => {
        for (let i = 0; i < this.wishLists.length; i++) {
          if (this.wishLists[i].id === wishListId) {
            this.wishLists.splice(i, 1);
          }
        }
        this.onWishListChange.emit({ event: "remove", productId: productId });
        this.wishListNumber.emit(this.wishLists.length);
        resolve();
      }, (err) => {
        reject(err);
        console.log(err);
      })
    })
  }

  doesProductExistInWishList(productId: string): any {
    if (this.wishLists.length > 0) {
      for (let i = 0; i < this.wishLists.length; i++) {
        if (this.wishLists[i].productId === productId) {
          return true;
        }
      }
    } else {
      this.getAllWishList().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].productId === productId) {
            return true;
          }
        }
      })
    }
  }
}
