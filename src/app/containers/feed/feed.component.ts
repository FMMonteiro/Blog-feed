import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeedService } from './feed.service';
import { PostData } from './feed.typings';

@Component({
  selector: 'app-feed',
  styleUrls: ['./feed.component.scss'],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  // apagar isto do undefined
  public test$: Observable<PostData[]> | undefined; // = new Observable<PostData[]>();

  constructor(private service: FeedService) {}

  public ngOnInit(): void {
    console.log('feed on init');

    this.test$ = this.service.getFeedPosts().pipe(
      tap((data) => {
        console.log(data);

        // validar isto das datas quando tiver outros posts com data diferentes

        data.sort((obj1, obj2) =>
          (<string>obj1.publish_date).localeCompare(
            obj2.publish_date,
            undefined,
            { sensitivity: 'base' }
          )
        );
      })
    );
  }
}
