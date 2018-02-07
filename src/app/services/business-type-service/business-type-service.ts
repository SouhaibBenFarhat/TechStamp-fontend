import { Injectable } from '@angular/core';
import { BusinessType } from "../../models/businessType";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import 'rxjs/add/operator/map';

@Injectable()
export class BusinessTypeService {

  private converter: Converters;

  constructor(private http: HttpClient, private global: Globals) {
    this.converter = new Converters();
  }


  getAllBusinessType(): any {
    let businessTypes = Array<BusinessType>();
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['business-type']).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.converter.businessTypeJsonToObject(data[i]).then((bt: BusinessType) => {
            businessTypes.push(bt);
          });
        }
        resolve(businessTypes);
      }, (err) => {
        reject(err);
      });
    });
  }


  getBusinessTypeById(id): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['business-type'] + id).map((data: any) => data.data).subscribe((data) => {
        this.converter.businessTypeJsonToObject(data).then((bt: BusinessType) => {
          resolve(bt);
        });
      }, (err) => {
        reject(err);
      })
    })
  }

}
