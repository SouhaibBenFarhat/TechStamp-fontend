import { Component, OnInit } from '@angular/core';
import { AuthService } from "../app/services/auth-service/auth.service";
import { User } from "../app/models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';


  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getCurrentUser().then((data: User) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}
