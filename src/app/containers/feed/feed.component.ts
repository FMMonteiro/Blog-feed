import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: FeedService, private router: Router) {}

  public ngOnInit(): void {
    this.posts$ = this.service.getFeedPosts().pipe(
      tap((data) => {
        let store;
        data.forEach((elem) => {
          elem.isFavorite = false;
          if (localStorage.getItem('favorites')) {
            store = JSON.parse(
              localStorage?.getItem('favorites') || [].toString()
            );
            if (Array.isArray(store)) {
              elem.isFavorite = store.indexOf(elem.id) > -1 ? true : false;
            }
          }
          elem.avatar_color =
            this.colors[Math.floor(Math.random() * this.colors.length)];
        });
      })
    );
  }

  public getInitials(user: string): string {
    const splitedName: string[] = user.split(' ');

    return splitedName[0].charAt(0) + splitedName[1].charAt(0);
  }

  public seeMoreDetails(
    ev: MouseEvent,
    id: number,
    color: string | undefined
  ): void {
    ev.preventDefault();

    window.open('/feed/' + id + '?user=' + color, '_blank');
  }

  public setFavorite(ev: MouseEvent, item: PostData): void {
    ev.preventDefault();

    this.service.setFavorite(item);
  }
  // public setFavorite(ev: MouseEvent, item: PostData): void {
  //   ev.preventDefault();

  //   let store;
  //   if (localStorage.getItem('favorites')) {
  //     store = JSON.parse(localStorage?.getItem('favorites') || '');
  //     console.log(store);
  //     if (Array.isArray(store)) {
  //       const index: number = store.indexOf(item.id);
  //       if (index > -1) {
  //         item.isFavorite = false;
  //         store.splice(index, 1);
  //       } else {
  //         item.isFavorite = true;
  //         store.push(item.id);
  //       }
  //       localStorage.setItem('favorites', JSON.stringify(store));
  //     } else {
  //       let array = Array.from(store);

  //       const index = array.indexOf(item.id);
  //       if (index > -1) {
  //         array.splice(index, 1);
  //       } else {
  //         array.push(item.id);
  //       }
  //       localStorage.setItem('favorites', JSON.stringify(array));
  //     }
  //   } else {
  //     localStorage.setItem('favorites', JSON.stringify([item.id]));
  //   }
  // }
}
