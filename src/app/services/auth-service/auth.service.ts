import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(user){

    this.http.post('localhost:5000/login',{email:user.email,password:user.password}).subscribe((data)=>{
      return data;
    });

  }

}
