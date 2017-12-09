import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';


@Injectable()
export class AuthService {

  private currentUser: User = new User()
  
  constructor(private http: HttpClient, private global: Globals, private converter: Converters) { }

  login(user: User): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['login'], { email: user.email, password: user.password }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((data: User) => {
            this.setCurrentUser(data);
            resolve(data);
          });
        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
      });

    });

  }
  getUserByToken(token: string): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + token);

    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['info'], { headers: headers }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((data: User) => {
            this.setCurrentUser(data);
            resolve(data);
          });
        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
      });
    });

  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.persistToken(user.token);
  }
  getCurrentUser(): any {
    return new Promise((resolve, reject) => {
      if (this.currentUser != null && this.currentUser != undefined) {
        resolve(this.currentUser);
      } else {
        this.getUserByToken(this.getCurrentUserToken()).then((data) => {
          if (data) {
            this.converter.userJsonToObject(data).then((data) => {
              this.setCurrentUser(data);
              resolve(data);
            })
          }
        }).catch((err) => {
          reject('This user is not defined.');
        });
      }

    });

  }
  private persistToken(token) {
    localStorage.setItem(this.global.TOKEN_KEY, token);
  }
  private getCurrentUserToken() {
    return localStorage.getItem(this.global.TOKEN_KEY);
  }

}
