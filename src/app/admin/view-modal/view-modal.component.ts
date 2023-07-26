import { Component, OnInit, Input } from '@angular/core';
import { DataModalServiceService } from '../service/data-modal-service.service';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss'],
})
export class ViewModalComponent implements OnInit {
  @Input() displayData:any;
  constructor(private dataModal: DataModalServiceService) {}

  

  ngOnInit(): void {
    this.getData();
  }

  showEdu: boolean;

  showExp: boolean;

  async getData() {
    this.showEdu = this.displayData.education.length == 0;
    this.showExp = this.displayData.experience.length == 0;
  }

  trgCloseModal() {
    this.dataModal.closeModalView();
  }
}
