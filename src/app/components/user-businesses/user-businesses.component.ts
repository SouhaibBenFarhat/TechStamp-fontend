import { Component, OnInit } from '@angular/core';
import { BusinessService } from "../../services/business-service/business-service.service";
import { Business } from "../../models/business";
import { AuthService } from "../../services/auth-service/auth.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-user-businesses',
  templateUrl: './user-businesses.component.html',
  styleUrls: ['./user-businesses.component.css']
})
export class UserBusinessesComponent implements OnInit {

  businesses: Array<Business> = new Array<Business>();


  constructor(private businessService: BusinessService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(data => {
      this.getUserBusiness(data._id);
    }).catch((err) => {
      console.log(err);
    })
  }


  getUserBusiness(userId: string) {
    this.businessService.getBusinessByUser(userId).then((data) => {
      this.businesses = data;
      console.log(this.businesses);
    }).catch((err) => {
      console.log(err);
    })
  }

}
