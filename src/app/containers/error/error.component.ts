import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  styleUrls: ['error.component.scss'],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  constructor(private router: Router) {}

  public backTolist(ev: MouseEvent): void {
    ev.preventDefault();

    this.router.navigate(['/feed']);
  }
}
