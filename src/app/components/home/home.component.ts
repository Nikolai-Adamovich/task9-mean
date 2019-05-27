import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { INews } from '../../interfaces/news.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: INews[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.news.subscribe((data: INews[]) => {
      this.news = data;
    });

    this.newsService.getNews();
  }

}
