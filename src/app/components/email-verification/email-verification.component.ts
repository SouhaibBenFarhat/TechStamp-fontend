import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  token: string = "";
  private lottieConfig: Object;
  private loading: boolean = false;
  private anim: any;


  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.lottieConfig = {
      path: 'assets/animation/tick.json',
      autoplay: false,
      loop: false
    };

    this.activatedRoute.params.subscribe((params) => {
      this.token = params.token;
      this.confirmUser();
    })
  }

  ngOnInit() {

  }

  confirmUser() {
    this.authService.confirmEmail(this.token).then((data) => {
      this.anim.play();
    }).catch((err) => {
      this.router.navigate(['/login']);
      console.log(err);
    });
  }
  handleAnimation(anim: any) {
    this.anim = anim;
  }

}
