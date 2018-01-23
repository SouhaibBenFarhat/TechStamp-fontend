import { Injectable } from '@angular/core';
import { Business } from "../../models/business";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class BusinessService {

  headers;
  private converter: Converters;

  constructor(private http: HttpClient, private global: Globals, private authService: AuthService) {
    this.converter = new Converters();
  }
  public getBusinessByUser(userId: string): any {
    let businesses = Array<Business>();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['business-by-user'] + userId, { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.businessJsonToObject(data[i]).then((business: Business) => {
            businesses.push(business);
          })
        }
        resolve(businesses);
      }, (err) => {
        reject(err);
      })
    });
  }

  public getBusinessById(businessId: string): any {
    this.headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['business-by-id'] + businessId, { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        this.converter.businessJsonToObject(data).then((business) => {
          resolve(business);
        })
      }, (err) => {
        reject(err);
      })

    })
  }
}
