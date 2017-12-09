import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((data:User)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
