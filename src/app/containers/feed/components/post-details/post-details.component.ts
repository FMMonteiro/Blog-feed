import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  styleUrls: ['./post-details.component.scss'],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  public ngOnInit(): void {
    console.log('post details init');
  }
}
