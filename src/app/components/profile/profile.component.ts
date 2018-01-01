import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";
import { ProfilService } from "../../services/profile-service/profil.service";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-profile',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('1000ms', style({ transform: 'translateX(0%)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;
  currentUser: User;
  addressToDeleteId: string = "";
  showUpdateProfile = false;
  showUploadAlert = false;
  profilePicture: string;
  file: File;

  constructor(private authService: AuthService, private profileService: ProfilService) {
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
      this.profilePicture = "";
      this.profilePicture = this.currentUser.profilePictureUrl;

    });
  }

  ngOnInit() {
    this.profileService.onCurrentUserChange.subscribe(() => {
      this.authService.getCurrentUser().then((data) => {
        this.currentUser = data;
        this.showUpdateProfile = false;
        this.profilePicture = "";
        this.profilePicture = this.currentUser.profilePictureUrl;
      })
    });

    this.profileService.onAddressSubmitted.subscribe(() => {
      this.closeBtn.nativeElement.click();
    })
  }

  dispalyDeleteAddressAlert(_id: string) {
    this.addressToDeleteId = _id;
  }

  deleteAddress(_id: string) {
    this.profileService.deleteAddress(_id).then((data) => {

    })
  }

  openUploader() {
    this.inputFile.nativeElement.click();
  }
  fileChange(event) {
    this.showUploadAlert = true;
    this.file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.profilePicture = e.target.result;
    }
  }
  discardUpload() {
    this.showUploadAlert = !this.showUploadAlert;
    this.profilePicture = this.currentUser.profilePictureUrl;
  }

  uploadProfilePicture() {
    if (this.file != null && this.file != undefined) {
      this.profileService.uploadProfilePicture(this.file).then((data) => {
        this.showUploadAlert = false;
      });
    }
  }

}
