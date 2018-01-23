import { Component, OnInit, Input } from '@angular/core';
import { Business } from "../../models/business";

@Component({
  selector: 'app-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.css']
})
export class BusinessItemComponent implements OnInit {

  @Input() business: Business;

  constructor() { }

  ngOnInit() {
  }

}
