import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { INews } from '../../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private _news: Subject<INews[]> = new Subject();
  public get news(): Observable<INews[]> {
    return this._news.asObservable();
  }

  getNews(): void {
    this.http.get('/news').subscribe((data: INews[]) => {
      this._news.next(data);
    });
  }

}
