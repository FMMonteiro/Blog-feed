import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, pluck } from 'rxjs/operators';
import { PostData } from './feed.typings';

@Injectable()
export class FeedService {
  constructor(private client: HttpClient) {}

  // typing
  public getFeedPosts(): Observable<PostData[]> {
    const endpoint: string = 'http://localhost:9000/posts';

    return this.client.get(endpoint, {}).pipe(first()) as Observable<
      PostData[]
    >;
  }
}
