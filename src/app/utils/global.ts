import { Injectable } from '@angular/core';

@Injectable()
export class Globals {


    TOKEN_KEY = "TOKEN";
    CURRENT_USER = "CURRENT_USER";
    TOKEN_LENGTH = 273;
    IS_LOGGED_IN = "IS_LOGGED_IN";
    API_KEY = "d4e84ad4231a48bb89d8d16ef9daef76";
    TK = "TEMPRORAY_TOKEN";
    USER_ROLE = "user";
    BUSINESS_ROLE = "business";



    urls = {} as IDictionary;
    private serverAddress: string = "http://localhost:5000";


    constructor() {

        //External
        this.urls['news'] = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=' + this.API_KEY;


        //Internal
        //Auth
        this.urls['login'] = this.serverAddress + '/api/auth/login';
        this.urls['register'] = this.serverAddress + '/api/auth/register';
        this.urls['send-email-verification'] = this.serverAddress + '/api/auth/send-email-verification/';
        this.urls['info'] = this.serverAddress + '/api/auth/info';
        this.urls['confirm-email'] = this.serverAddress + '/api/auth/confirm-email/';
        this.urls['check-confirmation'] = this.serverAddress + '/api/auth/check-confirmation';

        //Data Secure
        this.urls['product'] = this.serverAddress + '/api/v1/product';
        this.urls['products-pagination'] = this.serverAddress + '/api/v1/product/pagination';
        this.urls['topProduct'] = this.serverAddress + '/api/v1/product';
        this.urls['top-brands'] = this.serverAddress + '/api/v1/brand/top-brands';
        this.urls['brand'] = this.serverAddress + '/api/v1/brand';
        this.urls['brand-by-id'] = this.serverAddress + '/api/v1/brand';
        this.urls['category'] = this.serverAddress + '/api/v1/category';
        this.urls['product-by-brand'] = this.serverAddress + '/api/v1/product/by-brand/';
        this.urls['wish-list'] = this.serverAddress + '/api/v1/wish-list';
        this.urls['wish-list-exist'] = this.serverAddress + '/api/v1/wish-list/exist/';
        this.urls['wish-list-delete'] = this.serverAddress + '/api/v1/wish-list/';
        this.urls['address'] = this.serverAddress + '/api/v1/user/address/';
        this.urls['delete-address'] = this.serverAddress + '/api/v1/user/address/';
        this.urls['personal-detail'] = this.serverAddress + '/api/v1/user/personal-detail/';
        this.urls['upload-picture'] = this.serverAddress + '/api/v1/upload/profile_picture/';
        this.urls['add-business'] = this.serverAddress + '/api/v1/business';


        //Public
        this.urls['public-category'] = this.serverAddress + '/api/public/category';






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