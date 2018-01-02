import { Injectable, EventEmitter } from '@angular/core';
import { User, Address, PersonalDetail } from "../../models/user";
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';
import { Ng2ImgMaxService } from 'ng2-img-max';



@Injectable()
export class ProfilService {

  headers;
  onCurrentUserChange = new EventEmitter<any>();
  onAddressSubmitted = new EventEmitter<any>();



  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private authService: AuthService, private ng2ImgMaxService: Ng2ImgMaxService) {

  }



  addAddress(address: Address): any {

    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

    let addresses = new Array<Address>();
    addresses.push(address);
    console.log(addresses);

    return new Promise((resolve, reject) => {
      this.http.put(this.global.urls['address'], addresses, { headers: this.headers }).subscribe((data) => {
        this.converter.userJsonToObject(data).then((user) => {
          this.authService.setCurrentUser(user);
          this.onCurrentUserChange.emit(0);
          this.onAddressSubmitted.emit(0);
          resolve(user);
        })
      }, (err) => {
        reject(err);
      });
    })
  }

  resizeImage(file: File): any {
    return new Promise((resolve, reject) => {
      this.ng2ImgMaxService.compress([file], 1).subscribe((result) => {
        this.ng2ImgMaxService.resize([result], 1000, 1000).subscribe(finalResult => {
          resolve(finalResult);
        }, error => {
          reject(error);
        });

      }, (err) => {
        reject(err);
      });

    });
  }

  uploadProfilePicture(file: File): any {
    let formData: FormData = new FormData();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

    return new Promise((resolve, reject) => {
      this.resizeImage(file).then((fileToUpload) => {
        formData.append('file', fileToUpload, file.name);
        const req = new HttpRequest('POST', this.global.urls['upload-picture'], formData, { headers: this.headers, reportProgress: true });
        this.http.request(req).subscribe((data) => {
            if (data.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * data.loaded / data.total);
              console.log(`File is ${percentDone}% uploaded.`);
            } 
            else if(data instanceof HttpResponse) {
           
              this.converter.userJsonToObject(data.body).then((user) => {
                this.authService.setCurrentUser(user);
                this.onCurrentUserChange.emit(0);
                resolve(data);
              })
            }


          }, (err) => {
            reject(err);
          });
      }).catch((err) => {
        reject(err);
      })
    })
  }


  addPersonalDetail(personalDetail): any {

    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {
      this.http.put(this.global.urls['personal-detail'], personalDetail, { headers: this.headers }).subscribe((data) => {
        this.converter.userJsonToObject(data).then((user) => {
          this.authService.setCurrentUser(user);
          this.onCurrentUserChange.emit(0);
          resolve(user);
        })
      }, (err) => {
        reject(err);
      })
    })

  }

  deleteAddress(_id: string): any {

    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

    return new Promise((resolve, reject) => {
      this.http.request('delete', this.global.urls['delete-address'], { body: { id: _id }, headers: this.headers }).subscribe((data) => {
        this.converter.userJsonToObject(data).then((user) => {
          this.authService.setCurrentUser(user);
          this.onCurrentUserChange.emit(0);
          resolve(user);
        })
      }, (err) => {
        reject(err);
      });
    });

  }
}
