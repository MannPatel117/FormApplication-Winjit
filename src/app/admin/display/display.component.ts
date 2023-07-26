import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataModalServiceService } from '../service/data-modal-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: [
    './display.component.scss',
    '../view-modal/view-modal.component.scss',
  ],
})
export class DisplayComponent implements OnInit {
  dataArray = [];

  sendData: any;

  parsedArrayMap: any;

  constructor(
    private dataModal: DataModalServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
    this.dataArray = [];
    this.dataArray = Object.keys(sessionStorage).map((key) => {
      return sessionStorage.getItem(key);
    });
    this.processData();
  }

  processData() {
    this.parsedArrayMap = [];
    this.parsedArrayMap = this.dataArray.map((jsonString) =>
      JSON.parse(jsonString)
    );
  }

  OpenModalDet(id: number) {
    this.dataModal.openModalDet(id);
  }

  triggerViewData(id: number) {
    this.sendData = this.parsedArrayMap.find(
      (item: { key: number }) => item.key === id
    );
    this.dataModal.openModalView(this.sendData);
  }
}
