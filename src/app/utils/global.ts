import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

    urls = {} as IDictionary;
    serverAddress: string = "http://localhost:5000/";

    
    constructor() {
        this.urls['login'] = this.serverAddress + 'login';
        this.urls['register'] = this.serverAddress + 'register';
    }


}

interface IDictionary {
    [index: string]: string;
}