import { Injectable } from '@angular/core';
import { Product } from "../../models/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  headers;


  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService) {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
  }



  getAllProducts(): any {
    let products = Array<Product>();
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['product'], { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.productJsonToObject(data[i]).then((product: Product) => {
            products.push(product);
          });
        }
        resolve(products);
      }, (error) => {
        reject(error);
      });
    });

  }

  getPorductByCategoryId(categoryId: string): any {
    let products = Array<Product>();
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['product'] + this.global.singleQuaryParamBuilder('categoryId', categoryId), { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.productJsonToObject(data[i]).then((product: Product) => {
            products.push(product);
          });
        }
        resolve(products);
      }, (err) => {
        reject(err);
      })
    });
  }

  getTopproducts(limit: string): any {
    let products = Array<Product>();
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['topProduct'] + '/' + limit, { headers: this.headers }).map((data: any) => data.data).subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.productJsonToObject(data[i]).then((product: Product) => {
            products.push(product);
          });
        }
        resolve(products);
      }, (err) => {
        reject(err);
      });
    })
  }

}


