import { Injectable } from '@angular/core';
import { Article } from "../../models/article";
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../utils/global';
import { Converters } from '../../utils/converters';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  articles: Array<Article> = new Array<Article>();
  private converter: Converters;

  constructor(private http: HttpClient, private global: Globals) {
    this.converter = new Converters();
  }



  getAllArticles(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['news']).map((data: any) => data.articles).subscribe((data: any) => {
        if (data != null && data != undefined) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].author) {
              this.converter.articleJsonToObject(data[i]).then((article) => {
                if (i <= 4) {
                  this.articles.push(article);
                }
              });
            }
          }
          resolve(this.articles);
        }
      }, (err) => {
        reject(err);
      })
    })

  }

}
