import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Output() closeModal = new EventEmitter();
  @Input() title:string = '';
  @Input() description: string = '';
  @Input() imgUrl:string = '';

  close(){
    this.closeModal.emit(false)
  }
}
