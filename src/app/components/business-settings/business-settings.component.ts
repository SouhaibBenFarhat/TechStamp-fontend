import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from "../../services/business-service/business-service.service";
import { Business } from "../../models/business";

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.css']
})
export class BusinessSettingsComponent implements OnInit {

  business: Business = new Business();
  businessId: string;


  constructor(private route: ActivatedRoute, private businessService: BusinessService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.businessId = params.id;
      this.businessService.getBusinessById(this.businessId).then((data: Business) => {
        this.business = data;
        console.log(this.business);
      });
    }, (err) => {
      console.log(err);
    });
  }

}
