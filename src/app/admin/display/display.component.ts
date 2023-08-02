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

  showData= false; //hide the Data component initially
  showDet= false; // hide the delete component initially

  sendData: any; //holds data to display in view modal
  
  titleText='';  // Dynamic title text for Delete Modal

  detId: number; // Holds Id of item to be deleted

  parsedArrayMap: any; 

  constructor(private dataModal: DataModalServiceService, private modalService: NgbModal) 
  {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  /* Function to Fetch Data from Session Storage */

  fetchAllData() {
    this.dataArray = [];
    this.dataArray = Object.keys(sessionStorage).map((key) => {
      return sessionStorage.getItem(key);
    });
    this.processData();
  }

  /* Function to Process Stringed JSON Data from Session Storage */

  processData() {
    this.parsedArrayMap = [];
    this.parsedArrayMap = this.dataArray.map((jsonString) =>
      JSON.parse(jsonString)
    );
  }

  /* Function to Open Delete Modal */

  OpenModalDet(id: number) {
    // this.dataModal.openModalDet(id);
    this.titleText="Are you sure?";
    this.detId=id;
    this.showDet=true;
  }

  /* Function to Find Detailed Info of Specific Id to display in View Modal */

  findData(id:number){
    return this.parsedArrayMap.find(
      (item: { key: number }) => item.key === id
    );
  }

  /* Function to Open View Modal */

  async triggerViewData(id: number) {
    this.sendData = await this.findData(id);
    this.showData= true;
    // this.dataModal.openModalView(this.sendData);
  }

  /* Function to Close View Modal */

  hideData(data: boolean)
  {
    this.showData=data;
  }

  /* Function to Close Delete Modal */

  hideDet(data: boolean)
  {
    this.showDet=data;
  }
 
}
