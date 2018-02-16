import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { Globals } from '../utils/global';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';


@Injectable()
export class RegisterGuard implements CanActivate {

    data: string;

    constructor(private router: Router, private authService: AuthService, private global: Globals, private route: ActivatedRoute) { }

    canActivate(): Observable<boolean> | boolean | any {

        return new Promise((resolve, reject) => {
            if (this.authService.getTemporaryToken() != null && this.authService.getTemporaryToken() != undefined) {
                this.authService.checkConfirmation(this.authService.getTemporaryToken()).then(() => {
                    resolve(true);
                }).catch((err) => {
                    resolve(false);
                    localStorage.removeItem(this.global.TK);
                    this.router.navigate(['login']);
                });
            } else {
                this.router.navigate(['login']);
                resolve(false);
            }
        });
    }

}
