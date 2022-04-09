import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public display$: Observable<string> = new Observable();

  @Output() public handleCommentPublish: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.display$ = this.modalService.watchModalState();
  }

  close() {
    this.handleCommentPublish.emit('cenas');
    this.modalService.closeModal();
  }
}
