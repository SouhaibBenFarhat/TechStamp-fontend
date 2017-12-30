import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
    }


    this.authService.onUserLoggedIn.subscribe(() => {
      this.currentUser = this.authService.currentUser;
    });
    this.authService.onUserLogout.subscribe(() => {
      this.currentUser = null;
    })
  }

}
