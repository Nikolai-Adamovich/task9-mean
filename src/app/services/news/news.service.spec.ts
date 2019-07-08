import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientModule } from '@angular/common/http';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NewsService,
    ],
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
  });
});
