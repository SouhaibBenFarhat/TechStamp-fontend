import { Injectable } from '@angular/core';

@Injectable()
export class Globals {


    TOKEN_KEY = "TOKEN";
    CURRENT_USER = "CURRENT_USER";
    TOKEN_LENGTH = 273;
    IS_LOGGED_IN = "IS_LOGGED_IN";
    API_KEY = "d4e84ad4231a48bb89d8d16ef9daef76";



    urls = {} as IDictionary;
    private serverAddress: string = "http://localhost:5000";


    constructor() {

        //External
        this.urls['news'] = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=' + this.API_KEY;


        //Internal
        this.urls['login'] = this.serverAddress + '/api/auth/login';
        this.urls['register'] = this.serverAddress + '/api/auth/register';
        this.urls['info'] = this.serverAddress + '/api/auth/info';
        this.urls['product'] = this.serverAddress + '/api/v1/product';
        this.urls['topProduct'] = this.serverAddress + '/api/v1/product/';
        this.urls['top-brands'] = this.serverAddress + '/api/v1/brand/top-brands';
        this.urls['brand'] = this.serverAddress + '/api/v1/brand';
        this.urls['category'] = this.serverAddress + '/api/v1/category';
        this.urls['product-by-brand'] = this.serverAddress + '/api/v1/product/by-brand/';
        this.urls['wish-list'] = this.serverAddress + '/api/v1/wish-list';

    }


    singleQuaryParamBuilder(attribute: string, data: string) {
        return '?' + attribute + '=' + data;
    }
    multipleQueryParamsBuilder(attributes: Array<string>, data: Array<string>) {
        //TODO LATER
    }



}

interface IDictionary {
    [index: string]: string;
}