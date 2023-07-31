import { Component } from '@angular/core';
import { DataModalServiceService } from '../service/data-modal-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  titleText:string;
  redBtnText:string;
  greyBtnText: string;
  modalDetRef:any;
  constructor(private dataModal: DataModalServiceService) {}
  
  trgCloseModal() {
    this.modalDetRef.close();
  }

  deleteData() {
    this.dataModal.deleteItem();
  }
}
