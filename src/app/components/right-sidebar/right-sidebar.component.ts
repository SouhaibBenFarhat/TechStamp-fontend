import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news-service/news.service";
import { Article } from '../../models/article';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {

  articles: Array<Article> = new Array<Article>();

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getAllArticles().then((data) => {
      this.articles = data;
    }).catch((err) => {
    });
  }

}
