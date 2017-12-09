import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Converters } from '../../utils/converters';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private router: Router, private converter: Converters) { }

  ngOnInit() {
  }



  onLoginClicked() {
    this.user.email = "souhaib.benfarhat@esprit.tn";
    this.user.password = "rootroot";
    this.authService.login(this.user).then((data) => {
      this.router.navigate(['']);
    }).catch((err) => {
      console.log(err);
    });


  }

}
