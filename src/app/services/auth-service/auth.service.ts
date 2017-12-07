import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utils/global';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private global: Globals) { }


  login(user) {
    this.http.post(this.global.urls['login'], { email: user.email, password: user.password }).subscribe((data) => {
      return data;
    }, (err) => {

    });

  }

}
