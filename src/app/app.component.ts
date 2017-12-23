import { Component, OnInit } from '@angular/core';
import { AuthService } from "../app/services/auth-service/auth.service";
import { User } from "../app/models/user";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  show: boolean = true;


  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf("contact") >= 0) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });


    this.authService.getCurrentUser().then((data: User) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}
