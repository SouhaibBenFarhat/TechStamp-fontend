import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }


  login(user){
    this.http.post('http://localhost:5000/login',{email:user.email,password:user.password}).subscribe((data)=>{
      return data;
    },(err)=>{
      
    });

  }

}
