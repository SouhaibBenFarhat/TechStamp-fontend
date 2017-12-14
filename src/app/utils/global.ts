import { Injectable } from '@angular/core';

@Injectable()
export class Globals {


    TOKEN_KEY = "TOKEN";
    CURRENT_USER = "CURRENT_USER";
    TOKEN_LENGTH = 273;
    IS_LOGGED_IN = "IS_LOGGED_IN";



    urls = {} as IDictionary;
    private serverAddress: string = "http://localhost:5000";


    constructor() {

        this.urls['login'] = this.serverAddress + '/api/auth/login';
        this.urls['register'] = this.serverAddress + '/api/auth/register';
        this.urls['info'] = this.serverAddress + '/api/auth/info';
        this.urls['product'] = this.serverAddress + '/api/v1/product';
        this.urls['topProduct'] = this.serverAddress + '/api/v1/product/';
        

    }


}

interface IDictionary {
    [index: string]: string;
}