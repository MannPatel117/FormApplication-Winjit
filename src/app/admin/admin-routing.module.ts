import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component';
import { Form2Component } from './form2/form2.component';

const routes: Routes = [
  {path:'form', component: FormComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'form2', component: Form2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  
 }
