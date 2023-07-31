import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewModalComponent } from '../view-modal/view-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DataModalServiceService {
  modalDetRef: NgbModalRef;
  modalViewRef: NgbModalRef;
  detId: number;

  constructor(private route: Router, private modalService: NgbModal) {}

  /*
  
    Function to Open Modal Delete 
  
  */

  openModalDet(fieldId: number) {
    this.detId = fieldId;
    this.modalDetRef = this.modalService.open(DeleteModalComponent, {
      centered: true,
      backdrop: 'static',
    });
    this.modalDetRef.componentInstance.titleText = 'Are you sure?';
    this.modalDetRef.componentInstance.modalDetRef = this.modalDetRef;
  }

  /*

    Function to Delete Selected Item

  */

  deleteItem() {
    sessionStorage.removeItem(String(this.detId));
    window.location.reload();
  }

  /*

    Function to Close Delete Modal

  */

  // closeModalDet() {
  //   this.modalDetRef.close();
  // }

  /*

    Function to Open View Modal

  */

  openModalView(dataView: any) {
    this.modalViewRef = this.modalService.open(ViewModalComponent, {
      centered: true, // Centers the modal vertically and horizontally
      size: 'lg',
      backdrop: 'static',
    });
    this.modalViewRef.componentInstance.displayData=dataView;
  }

  

  /*

    Function to Close View Modal

  */

  closeModalView() {
    this.modalViewRef.close();
  }
  
}
