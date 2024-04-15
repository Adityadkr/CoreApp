import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModuleComponent } from './create-module/create-module.component';

const routes: Routes = [
  {path:'create-module',component:CreateModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
