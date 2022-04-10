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
  public posts$: Observable<PostData[]> = new Observable<PostData[]>();
  public colors = ['red', 'blue', 'green', 'cyan', 'black', 'brown', 'coral'];

  constructor(private service: FeedService) {}

  public ngOnInit(): void {
    // console.log('feed on init');

    this.posts$ = this.service.getFeedPosts().pipe(
      tap((data) => {
        // console.log(data);

        // validar isto das datas quando tiver outros posts com data diferentes
        // passar para um pipe talvez e pôr no template no ngFor

        data.forEach((elem) => {
          elem.avatar_color =
            this.colors[Math.floor(Math.random() * this.colors.length)];
        });

        // data.sort((obj1, obj2) =>
        //   (<string>obj1.publish_date).localeCompare(
        //     obj2.publish_date,
        //     undefined,
        //     { sensitivity: 'base' }
        //   )
        // );
      })
    );
  }

  public getInitials(user: string): string {
    const splitedName: string[] = user.split(' ');
    console.log('initials');

    return splitedName[0].charAt(0) + splitedName[1].charAt(0);
  }
}
