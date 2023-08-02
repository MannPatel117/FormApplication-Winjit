import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataModalServiceService } from '../service/data-modal-service.service';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss'],
})

export class ViewModalComponent implements OnInit {
  // displayData:any;
  @Input() displayData: any | undefined;
  @Output() closeModal = new EventEmitter<boolean>();

  // modalViewRef: any;
  // displayData: any;
  grayBtnText: string;
  constructor() {}
  
  ngOnInit(): void {
 
  }

  showEdu: boolean;

  showExp: boolean;

  // async process() {
  //   this.showEdu = this.displayData.education.length == 0;
  //   this.showExp = this.displayData.experience.length == 0;
  // }

  trgCloseModal() {
    this.closeModal.emit(false);
  }
}
