import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModuleComponent } from './create-module/create-module.component';
import { CreateMessageComponent } from './create-message/create-message.component';

const routes: Routes = [
  {path:'create-module',component:CreateModuleComponent},
  {path:'create-message',component:CreateMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
