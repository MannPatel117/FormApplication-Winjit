import { Component, OnInit } from '@angular/core';
import { DataModalServiceService } from '../service/data-modal-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss'],
})
export class ViewModalComponent implements OnInit {
  displayData:any;
  modalViewRef: any;
  grayBtnText: string;
  constructor(public activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {
    this.process();
  }

  showEdu: boolean;

  showExp: boolean;

  async process() {
    this.showEdu = this.displayData.education.length == 0;
    this.showExp = this.displayData.experience.length == 0;
  }

  trgCloseModal() {
    this.modalViewRef.close();
  }
}
