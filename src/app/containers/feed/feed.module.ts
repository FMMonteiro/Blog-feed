import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

import { FeedComponent } from './feed.component';
import { routes } from './feed.routes';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [FeedComponent, PostDetailsComponent, CommentFormComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  providers: [],
})
export class FeedModule {}
