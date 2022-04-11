import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { FeedService } from '../../feed.service';
import { CommentData, PostData } from '../../feed.typings';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-post-details',
  styleUrls: ['./post-details.component.scss'],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(CommentFormComponent) public commentForm!: CommentFormComponent;

  public post$: Observable<PostData> = new Observable<PostData>();
  public comments$: Observable<any[]> = new Observable<any[]>();
  public postId: number = 0;
  private destroyer$: Subject<void>;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: FeedService,
    private router: Router
  ) {
    this.destroyer$ = new Subject<void>();
  }

  public ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroyer$))
      .subscribe((params: Params) => {
        if (params?.slug) {
          this.post$ = this.service.getSinglePost(params.slug).pipe(
            tap((info) => {
              this.postId = info.id;
              this.comments$ = this.service.getPostComments(info.id);
            }),
            catchError((err) => {
              console.log(err);
              this.router.navigate(['/feed']);
              // return of();
              return of({} as PostData);
            })
          );
          // this.service.getSinglePost(params.slug).subscribe(
          //   (post) => {
          //     console.log(post);
          //   },
          //   (error: HttpErrorResponse) => {
          //     console.log(error);
          //     // no caso do id nao exister mandar pra pagina anterior ou mostrar uma pagina de erro a dizer q n existe?
          //     // posso mandar pra uma rota de /error visto q tou noutra tab
          //     // fazer no fim
          //     this.router.navigate(['/feed']);
          //   }
          // );
        }

        // this.getContentPage(slug);
      });
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
  }

  public handleFormSubmission(event: CommentData): void {
    console.log(event);

    // this.service.updateComment(9, event).subscribe();

    this.service.addComment(this.postId, event).subscribe(
      () => {
        console.log('success on form adding comment');
        this.commentForm.form.reset();
        this.comments$ = this.service.getPostComments(this.postId);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        // snackbar?
      }
    );
  }
}
