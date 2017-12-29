import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { Router } from '@angular/router';



@Injectable()
export class AuthService {

  public currentUser: User;
  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private router: Router) { }

  login(user: User): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['login'], { email: user.email, password: user.password }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((data: User) => {
            this.setCurrentUser(data);
            this.persistToken(data.token);
            localStorage.setItem(this.global.IS_LOGGED_IN, 'true');
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

  register(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['register'], { email: user.email, password: user.password }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((data: User) => {
            this.setCurrentUser(data);
            this.persistToken(data.token);
            localStorage.setItem(this.global.IS_LOGGED_IN, 'true');
            resolve(data);
          });
        } else {
          reject('Error has occure...');
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.currentUser = null;
      localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
      resolve();
    });
  }
  private getUserByToken(token: string): any {
    var headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + token });

    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['info'], { headers: headers }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((user: User) => {
            this.setCurrentUser(user);
            this.persistToken(user.token);
            resolve(user);
          });
        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
      });
    });

  }


  getCurrentUser(): any {
    return new Promise((resolve, reject) => {
      if (this.currentUser !== null && this.currentUser !== undefined && localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
        resolve(this.currentUser);
      } else {
        if (this.getCurrentUserToken() != null && this.getCurrentUserToken() != undefined && localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
          this.getUserByToken(this.getCurrentUserToken()).then((data: User) => {
            if (data != null && data != undefined) {
              this.setCurrentUser(data);
              this.persistToken(data.token);
              resolve(data);

            } else {
              this.router.navigate(['/login']);
            }
          }).catch((err) => {
            reject('This user is not defined.');
            this.router.navigate(['/login']);
          });
        } else {
          this.router.navigate(['/login']);
        }
      }

    });

  }
  private persistToken(token: string) {
    if (token.length == this.global.TOKEN_LENGTH) {
      localStorage.setItem(this.global.TOKEN_KEY, token);
    } else {
      this.router.navigate(['/login']);
    }
  }
  public getCurrentUserToken() {
    if (localStorage.getItem(this.global.TOKEN_KEY)) {
      return localStorage.getItem(this.global.TOKEN_KEY);
    } else {
      this.router.navigate(['/login']);
    }
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

}
