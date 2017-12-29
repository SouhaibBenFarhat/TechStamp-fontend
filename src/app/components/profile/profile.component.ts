import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";
import { ProfilService } from "../../services/profile-service/profil.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  currentUser: User;

  constructor(private authService: AuthService, private profileService: ProfilService) {
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;

    });
  }

  ngOnInit() {
    this.profileService.onCurrentUserChange.subscribe(() => {
      this.authService.getCurrentUser().then((data) => {
        this.currentUser = data;
      })
    });

    this.profileService.onAddressSubmitted.subscribe(() => {
      this.closeBtn.nativeElement.click();
    })
  }

}
