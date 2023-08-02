import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataModalServiceService } from '../service/data-modal-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() titleText: string; //Dynamic Text for Display
  @Input() detId: number; //Inputting the Id of item to be deleted
  @Output() closeModal = new EventEmitter<boolean>(); //Handling closing of modal to emit its state change to parent component


  // titleText:string;
  // redBtnText:string;
  // greyBtnText: string;

  constructor(private dataModal: DataModalServiceService) {}
  
  /*
    Function to Emit change of modal state in Display Component
  */

  trgCloseModal() {
    this.closeModal.emit(false);
  }

  /*
    Function to Delete Data From Local Storage  
  */

  deleteData() {
    sessionStorage.removeItem(String(this.detId));
    window.location.reload();
  }
}
