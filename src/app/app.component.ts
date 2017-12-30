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

    this.authService.getCurrentUser().then((data: User) => {
    }).catch((err) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (event.url.indexOf("contact") >= 0) {
          this.show = true;
        } else {
          this.show = true;
        }
      }
    });



  }
}
