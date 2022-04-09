import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './containers/feed/components/post-details/post-details.component';
import { FeedComponent } from './containers/feed/feed.component';

// const routes: Routes = [];
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
      },
      {
        // mudar de slug pra id
        path: 'feed/:slug',
        component: PostDetailsComponent,
      },
      {
        path: '**',
        // redirectTo: '/error',
        redirectTo: '/feed',
      },
    ],
  },
  // {
  //   path: ':slug',
  //   component: PostDetailsComponent,
  // },
  // {
  // path: 'error',
  // fazer depois
  // loadChildren: () => import('@foursource/platform/app/containers/error/error.api').then(m => m.ErrorModule),
  // },
  // {
  //   path: '**',
  //   redirectTo: '/error',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
