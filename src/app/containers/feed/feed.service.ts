import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommentData, PostData } from './feed.typings';

@Injectable()
export class FeedService {
  constructor(private client: HttpClient) {}

  public getFeedPosts(): Observable<PostData[]> {
    // const endpoint: string = 'http://localhost:9000/posts';
    const endpoint: string =
      'http://localhost:9000/posts?_sort=publish_date&_order=desc&_embed=comments';

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      PostData[]
    >;
  }

  public getSinglePost(postId: string): Observable<PostData> {
    const endpoint: string = `http://localhost:9000/posts/${postId}`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<PostData>;
  }

  public getPostComments(postId: number): Observable<CommentData[]> {
    const endpoint: string = `http://localhost:9000/posts/${postId}/comments`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      CommentData[]
    >;
  }

  public addComment(postId: number, data: CommentData): Observable<unknown> {
    const endpoint: string = `http://localhost:9000/posts/${postId}/comments`;
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this.client
      .post(endpoint, data, { headers })
      .pipe(first()) as Observable<unknown>;
  }
}
