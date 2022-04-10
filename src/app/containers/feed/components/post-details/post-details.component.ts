import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { FeedService } from '../../feed.service';
import { CommentData, PostData } from '../../feed.typings';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ModalService } from '../modal/modal.service';

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
    private router: Router,
    private modalService: ModalService
  ) {
    this.destroyer$ = new Subject<void>();
  }

  public ngOnInit(): void {
    // console.log('post details init');

    this.activeRoute.params
      .pipe(takeUntil(this.destroyer$))
      .subscribe((params: Params) => {
        // console.log(params);
        if (params?.slug) {
          // console.log(params.slug);
          this.post$ = this.service.getSinglePost(params.slug).pipe(
            tap((info) => {
              // console.log('info');
              // console.log(info);
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

  public addComment(ev: MouseEvent): void {
    ev.preventDefault();

    console.log('add comment clicked');
    this.modalService.openModal();
  }
  // typing
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
      }
    );
    // so se der sucesso no form submit é q se fecha o popup
  }
}
