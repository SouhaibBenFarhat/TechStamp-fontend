import { Injectable, EventEmitter } from '@angular/core';
import { User, Address } from "../../models/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';
import { reject } from 'q';


@Injectable()
export class ProfilService {

  headers;
  onCurrentUserChange = new EventEmitter<any>();
  onAddressSubmitted = new EventEmitter<any>();



  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService) {
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
  }



  addAddress(address: Address): any {
    let addresses = new Array<Address>();
    addresses.push(address);
    console.log(addresses);

    return new Promise((resolve, reject) => {
      this.http.put(this.global.urls['address'], addresses, { headers: this.headers }).subscribe((data) => {
        this.converter.userJsonToObject(data).then((user) => {
          this.authService.setCurrentUser(user);
          this.onCurrentUserChange.emit(0);
          this.onAddressSubmitted.emit(0);
          resolve(data);
        })
      }, (err) => {
        reject(err);
      });
    })
  }
}
