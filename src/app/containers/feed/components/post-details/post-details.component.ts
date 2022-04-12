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
  public userColor: string = 'red';
  public commentsCount: number = 0;
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
        if (params?.id) {
          this.post$ = this.service.getSinglePost(params.id).pipe(
            tap((info) => {
              this.postId = info.id;
              this.comments$ = this.service.getPostComments(info.id).pipe(
                tap((res) => {
                  if (res?.length > 0) {
                    this.commentsCount = res.length;
                  }
                })
              );
            }),
            catchError((err) => {
              console.log(err);
              // this.router.navigate(['/feed']);
              this.router.navigate(['/error']);
              // return of();
              return of({} as PostData);
            })
          );
          // this.service.getSinglePost(params.id).subscribe(
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

        // this.getContentPage(id);
      });
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params?.user && this.checkIfColorIsValid(params.user)) {
        this.userColor = params.user;
      }
    });
  }

  public getInitials(user: string): string {
    const splitedName: string[] = user.split(' ');

    return splitedName[0].charAt(0) + splitedName[1].charAt(0);
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
  }

  public checkIfColorIsValid(color: string): boolean {
    const savedWords: string[] = ['initial', 'unset', 'inherit'];
    let s = new Option().style;
    s.color = color;
    return s.color == color && savedWords.indexOf(color) === -1;
  }

  public handleFormSubmission(event: CommentData): void {
    this.service
      .addComment(this.postId, {
        ...event,
        ...{ postId: Number(this.postId), parent_id: null },
      })
      .subscribe(
        () => {
          console.log('success on form adding comment');
          this.commentForm.form.reset();
          this.comments$ = this.service.getPostComments(this.postId).pipe(
            tap((res) => {
              if (res?.length > 0) {
                this.commentsCount = res.length;
              }
            })
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
