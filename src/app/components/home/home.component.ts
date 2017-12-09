import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {CacheService} from '../../services/cache/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cacherService:CacheService) { }

  ngOnInit() {
    console.log(this.cacherService.getCurrentUser());
  }

}
