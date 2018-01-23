import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";
import { ProfilService } from "../../services/profile-service/profil.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User = null;
  profilePicture: string = "";
  showNavbar: boolean = false;

  constructor(private authService: AuthService, private profileService: ProfilService) { }

  ngOnInit() {

    this.profileService.onCurrentUserChange.subscribe(() => {
      this.currentUser = this.authService.currentUser;
      this.profilePicture = "";
      this.profilePicture = this.authService.currentUser.profilePictureUrl;
    })


    this.authService.getCurrentUser().then(() => {
      this.currentUser = this.authService.currentUser;
      this.profilePicture = "";
      this.profilePicture = this.authService.currentUser.profilePictureUrl;
      this.showNavbar = true;
    })





    this.authService.onUserLoggedIn.subscribe(() => {
      this.currentUser = this.authService.currentUser;
      this.profilePicture = "";
      this.profilePicture = this.authService.currentUser.profilePictureUrl;
      this.showNavbar = true;

    });
    this.authService.onUserLogout.subscribe(() => {
      this.currentUser = null;
      this.showNavbar = false;
    })
  }

}
