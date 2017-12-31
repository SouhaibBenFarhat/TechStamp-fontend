import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';
import { Category } from '../../models/category';


@Injectable()
export class CategoryService {

  headers;


  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService) {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
  }


  getNavbarCategories(): any {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    let categories = Array<Category>();

    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['category'] + '/5', { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.categoryJsonToObject(data[i]).then((category) => {
            categories.push(category);
          });
        }
        resolve(categories);
      }, (err) => {
        reject(err);
      });
    });
  }
}
