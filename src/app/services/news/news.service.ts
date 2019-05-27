import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { INews } from '../../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  news: Subject<INews[]> = new Subject();

  getNews(): void {
    this.http.get('/news').subscribe((data: INews[]) => {
      this.news.next(data);
    });
  }

}
