import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: "souhaib.benfarhat@esprit.tn",
    password: "rootroot"
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }



  onLoginClicked() {
    console.log("zab");
    this.router.navigate(['']);

  }

}
