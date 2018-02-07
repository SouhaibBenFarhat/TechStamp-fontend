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
  show: boolean = false;
  showRightSidebar = false;


  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {




  }

  ngOnInit() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {



        if ((event.url.indexOf("contact") >= 0) ||
          event.url.indexOf("login") >= 0 ||
          event.url.indexOf("reset-password") >= 0 ||
          event.url.indexOf("seller-registration") >= 0 ||
          event.url.indexOf("confirmation-error") >= 0 ||
          event.url.indexOf("after-registration") >= 0 ||
          event.url.indexOf("after-registration/email-verification") >= 0) {
          this.show = false;
          this.showRightSidebar = false;
        } else {
          this.show = true;
          this.showRightSidebar = true;
        }
        if (event.url.indexOf("latest") >= 0) {
          this.showRightSidebar = false;
        }
      }
    });






  }
}
