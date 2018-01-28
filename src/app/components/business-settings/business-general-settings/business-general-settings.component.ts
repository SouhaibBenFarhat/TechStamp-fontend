import { Component, OnInit, Input } from '@angular/core';
import { Business } from "../../../models/business";
import { BusinessType } from "../../../models/businessType";
import { DummyDataProvider } from "../../../utils/dummyData";


@Component({
  selector: 'app-business-general-settings',
  templateUrl: './business-general-settings.component.html',
  styleUrls: ['./business-general-settings.component.css']
})
export class BusinessGeneralSettingsComponent implements OnInit {

  @Input() business: Business;
  editing: boolean = false;
  private businessTypes = Array<BusinessType>();


  constructor() {

  }

  ngOnInit() {
    this.businessTypes = new DummyDataProvider().getDummyBusinessType();
    this.businessTypes.forEach(bt => {
      if (bt.name === this.business.businessType.name) {
        bt.selected = true;
      } else {
        bt.selected = false;
      }
    })
  }

  businessTypeChange(event) {
    console.log(event.target.value);
  }

}
