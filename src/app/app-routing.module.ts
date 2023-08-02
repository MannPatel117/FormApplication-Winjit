import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CheckObserveComponent } from './check-observe/check-observe.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: '', component: MainComponent },
  { path: 'observable', component: CheckObserveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  