import { Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';

import { FeedComponent } from './feed.component';

export const routes: Routes = [
  //   { path: '', redirectTo: 'feed', pathMatch: 'full' },
  {
    // path: 'feed',
    path: 'feed',
    component: FeedComponent,
    // children: [
    //   //   {
    //   //     path: ':slug',
    //   //     component: PostDetailsComponent,
    //   //   },
    //   { path: '', redirectTo: '/feed', pathMatch: 'full' },
    //   { path: ':slug', component: PostDetailsComponent },
    // ],
  },
  //   {
  //     path: 'feed/:slug',
  //     component: PostDetailsComponent,
  //   },
];
