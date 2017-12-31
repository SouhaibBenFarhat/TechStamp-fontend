import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import { Router } from '@angular/router';



@Injectable()
export class AuthService {

  public currentUser: User;
  public onUserLoggedIn = new EventEmitter<any>();
  public onUserLogout = new EventEmitter<any>();
  constructor(private http: HttpClient, private global: Globals, private converter: Converters, private router: Router) { }

  login(user: User): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['login'], { email: user.email, password: user.password }).subscribe((data) => {
        if (data != null) {
          this.converter.userJsonToObject(data).then((data: User) => {
            this.setCurrentUser(data);
            this.persistToken(data.token);
            localStorage.setItem(this.global.IS_LOGGED_IN, 'true');
            this.onUserLoggedIn.emit(0);
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
          let u = new User();
          u.email = user.email;
          u.password = user.password;
          this.login(u).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          })
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
      localStorage.removeItem(this.global.TOKEN_KEY)
      this.onUserLogout.emit(0);
      resolve();
    });
  }

  backToLogin() {
    this.currentUser = null;
    localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
    localStorage.removeItem(this.global.TOKEN_KEY)
    this.onUserLogout.emit(0);
    this.router.navigate[('/login')];
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
    localStorage.setItem(this.global.TOKEN_KEY, token);

  }
  public getCurrentUserToken(): any {
    if (localStorage.getItem(this.global.TOKEN_KEY) != null && localStorage.getItem(this.global.TOKEN_KEY) != undefined) {
      return localStorage.getItem(this.global.TOKEN_KEY);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

}
