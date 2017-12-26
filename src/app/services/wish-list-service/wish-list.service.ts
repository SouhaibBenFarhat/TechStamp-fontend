import { Injectable } from '@angular/core';
import { Product } from "../../models/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishList } from "../../models/wishList";
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';
import { reject } from 'q';

@Injectable()
export class WishListService {

  headers;
  
  
    constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService) {
      this.headers = new HttpHeaders(
        { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    }

    getAllWishList(): any {
      let wishLists = new Array<WishList>();
      return new Promise((resolve, reject) => {
        this.http.get(this.global.urls['wish-list'], { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
          for (let i = 0; i < data.length; i++) {
            this.converter.wishListJsonToObject(data[i]).then((wishList: WishList) => {
              wishLists.push(wishList);
            });
          }
          resolve(wishLists);
        }, (error) => {
          reject(error);
        });
      });
  
    }

}
