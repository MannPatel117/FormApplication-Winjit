import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { CheckObserveComponent } from './check-observe/check-observe.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CheckObserveComponent
  ],
  
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatListModule, 
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule, MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
