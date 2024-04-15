import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { CreateModuleComponent } from './create-module/create-module.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CreateModuleComponent
  ],
  imports: [
    CommonModule
    , ReactiveFormsModule,
    WorkflowRoutingModule
  ]
})
export class WorkflowModule { }
