import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { INews } from '../../interfaces/news.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public currentPage: number;

  news: INews[];

  constructor(private newsService: NewsService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.newsService.news.subscribe((data: INews[]) => {
      this.news = data;
      this.ref.markForCheck();
    });

    this.newsService.getNews();
  }

}
