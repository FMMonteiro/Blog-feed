import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommentData, PostData } from './feed.typings';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedService {
  constructor(private client: HttpClient) {}

  public getFeedPosts(): Observable<PostData[]> {
    const endpoint: string = `${environment.api_url}posts?_sort=publish_date&_order=desc&_embed=comments`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      PostData[]
    >;
  }

  public getSinglePost(postId: string): Observable<PostData> {
    const endpoint: string = `${environment.api_url}posts/${postId}`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<PostData>;
  }

  public getPostComments(postId: number): Observable<CommentData[]> {
    const endpoint: string = `${environment.api_url}posts/${postId}/comments`;

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      CommentData[]
    >;
  }

  public addComment(postId: number, data: CommentData): Observable<unknown> {
    const endpoint: string = `${environment.api_url}posts/${postId}/comments`;
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this.client
      .post(endpoint, data, { headers })
      .pipe(first()) as Observable<unknown>;
  }

  public setFavorite(item: PostData): void {
    let store;
    if (localStorage.getItem('favorites')) {
      store = JSON.parse(localStorage?.getItem('favorites') || '');
      if (Array.isArray(store)) {
        const index: number = store.indexOf(item.id);
        if (index > -1) {
          item.isFavorite = false;
          store.splice(index, 1);
        } else {
          item.isFavorite = true;
          store.push(item.id);
        }
        localStorage.setItem('favorites', JSON.stringify(store));
      } else {
        let array = Array.from(store);

        const index = array.indexOf(item.id);
        if (index > -1) {
          array.splice(index, 1);
        } else {
          array.push(item.id);
          item.isFavorite = true;
        }
        localStorage.setItem('favorites', JSON.stringify(array));
      }
    } else {
      item.isFavorite = true;
      localStorage.setItem('favorites', JSON.stringify([item.id]));
    }
  }
}
