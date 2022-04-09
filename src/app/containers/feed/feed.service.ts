import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, pluck } from 'rxjs/operators';
import { PostData } from './feed.typings';

@Injectable()
export class FeedService {
  constructor(private client: HttpClient) {}

  public getFeedPosts(): Observable<PostData[]> {
    const endpoint: string = 'http://localhost:9000/posts';

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      PostData[]
    >;
  }

  public getSinglePost(postId: string): Observable<PostData> {
    const endpoint: string = `http://localhost:9000/posts/${postId}`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<PostData>;
  }

  public getPostComments(postId: number): Observable<any[]> {
    const endpoint: string = `http://localhost:9000/posts/${postId}/comments`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<any[]>;
  }

  // typing
  public addComment(postId: number, data: any): Observable<any[]> {
    const endpoint: string = `http://localhost:9000/posts/${postId}/comments`;

    return this.client.post(endpoint, data).pipe(first()) as Observable<any[]>;
  }

  // typing
  public updateComment(commentId: number, data: any): Observable<any[]> {
    const endpoint: string = `http://localhost:9000/comments/${commentId}`;

    return this.client.put(endpoint, data).pipe(first()) as Observable<any[]>;
  }
}
