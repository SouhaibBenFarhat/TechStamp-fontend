import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService) { 
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
    
    });
  }

  ngOnInit() {

  }

}
