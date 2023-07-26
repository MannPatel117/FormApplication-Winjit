import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ViewModalComponent } from './view-modal/view-modal.component';
@NgModule({
  declarations: [
    FormComponent,
    DisplayComponent,
    DeleteModalComponent,
    ViewModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    FormsModule,
    NgbDatepickerModule, 
    NgbAlertModule, 
    JsonPipe,
  ],

})
export class AdminModule { }
