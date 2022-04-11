import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './containers/error/error.component';
import { PostDetailsComponent } from './containers/feed/components/post-details/post-details.component';
import { FeedComponent } from './containers/feed/feed.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'feed',
      },
      {
        path: 'feed',
        component: FeedComponent,
        // loadChildren: () =>
        //   import('src/app/containers/feed/feed.module').then(
        //     (m) => m.FeedModule
        //   ),
      },
      {
        path: 'feed/:slug',
        component: PostDetailsComponent,
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
      {
        path: '**',
        redirectTo: '/error',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
