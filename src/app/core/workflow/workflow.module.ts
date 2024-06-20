import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { CreateModuleComponent } from './create-module/create-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMessageComponent } from './create-message/create-message.component';




@NgModule({
  declarations: [
    CreateModuleComponent,
    CreateMessageComponent
  ],
  imports: [
    CommonModule
    , ReactiveFormsModule,
    WorkflowRoutingModule
  ]
})
export class WorkflowModule { }
