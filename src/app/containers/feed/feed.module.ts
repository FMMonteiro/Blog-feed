import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

import { FeedComponent } from './feed.component';
import { routes } from './feed.routes';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [FeedComponent, PostDetailsComponent, ModalComponent],
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [],
})
export class FeedModule {}