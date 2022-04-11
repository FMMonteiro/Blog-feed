import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostDetailsComponent } from './post-details.component';
import { FeedService } from './../../feed.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentData } from '../../feed.typings';

describe('PostDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [PostDetailsComponent, CommentFormComponent],
      providers: [
        FeedService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ slug: 1 }]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PostDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PostDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Post details');
  });

  it('handleFormSubmission test', () => {
    const comment: CommentData = {
      content: 'test message',
      user: 'user a',
      id: 3,
    };

    let service: FeedService = TestBed.inject(FeedService);
    spyOn(service, 'addComment').and.returnValue(of([]));
    const fixture = TestBed.createComponent(PostDetailsComponent);
    fixture.detectChanges();
    fixture.componentInstance.postId = 5;
    fixture.componentInstance.handleFormSubmission(comment);

    expect(service.addComment).toHaveBeenCalledWith(5, comment);
  });
});
