import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../../utils/global';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private global: Globals) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }


  onLogoutClicked() {
    this.isLoggedIn = false;
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
