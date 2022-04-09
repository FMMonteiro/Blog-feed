import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<string> = new BehaviorSubject('close');

  public watchModalState(): Observable<string> {
    return this.display.asObservable();
  }

  public openModal() {
    this.display.next('open');
  }

  public closeModal() {
    this.display.next('close');
  }
}
