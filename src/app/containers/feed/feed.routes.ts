import { Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';

import { FeedComponent } from './feed.component';

export const routes: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
  },
];
