import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  open = true;

  constructor() { }

  ngOnInit() {
  }

  markerClick() {
    console.log('marker click');
  }
  mapClick() {
    console.log('map click');
  }

}
