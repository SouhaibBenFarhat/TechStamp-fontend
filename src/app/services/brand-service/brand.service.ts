import { Injectable } from '@angular/core';
import { Brand } from "../../models/brand";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';


@Injectable()
export class BrandService {


  headers;
  private converter: Converters;

  constructor(private http: HttpClient, private global: Globals, private authService: AuthService) {
    this.converter = new Converters();
  }

  getAllBrands(): any {
    let brands = Array<Brand>();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['brand'], { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.brandJsonToObject(data[i]).then((brand: Brand) => {
            brands.push(brand);
          });
        }
        resolve(brands);
      }, (err) => {
        reject(err);
      });
    });
  }

  getTopBrands(): any {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    let brands = Array<Brand>();
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['top-brands'], { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.brandJsonToObject(data[i]).then((brand: Brand) => {
            brands.push(brand);
          });
        }
        resolve(brands);
      }, (err) => {
        reject(err);
      });
    });
  }

  getBrandById(id: string): any {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['brand-by-id'] + this.global.singleQuaryParamBuilder("id", id), { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }



}
