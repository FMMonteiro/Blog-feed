import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FeedComponent } from './feed.component';
import { FeedService } from './feed.service';

describe('FeedComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [FeedComponent],
      providers: [FeedService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FeedComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FeedComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(
      'New posts feed'
    );
  });

  it('should call getFeedPosts method', () => {
    let service: FeedService = TestBed.inject(FeedService);
    spyOn(service, 'getFeedPosts').and.returnValue(of([]));

    const fixture = TestBed.createComponent(FeedComponent);
    fixture.detectChanges();
    expect(service.getFeedPosts).toHaveBeenCalled();
  });
});
