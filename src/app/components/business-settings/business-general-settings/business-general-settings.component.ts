import { Component, OnInit, Input } from '@angular/core';
import { Business } from "../../../models/business";
import { BusinessType } from "../../../models/businessType";
import { BusinessTypeService } from "../../../services/business-type-service/business-type-service";
import { BusinessService } from "../../../services/business-service/business-service.service";

@Component({
  selector: 'app-business-general-settings',
  templateUrl: './business-general-settings.component.html',
  styleUrls: ['./business-general-settings.component.css']
})
export class BusinessGeneralSettingsComponent implements OnInit {

  @Input() business: Business;
  editing: boolean = false;
  private businessTypes = Array<BusinessType>();
  loadingBusinessType: boolean = false;


  constructor(private businessTypeService: BusinessTypeService, private businessService: BusinessService) {

  }

  ngOnInit() {

    this.businessTypeService.getAllBusinessType().then((data) => {
      this.businessTypes = data;
    }).catch((err) => {
      console.log(err);
    })




  }



  businessTypeChange(event) {
    if (event.target.value != null && event.target.value != undefined) {
      let id = event.target.value;
      this.loadingBusinessType = true;
      console.log(id);
      this.businessTypeService.getBusinessTypeById(id).then((data) => {
        if (data) {
          this.business.businessType = data;
          console.log(data);
        }
      })

    }
  }

}
