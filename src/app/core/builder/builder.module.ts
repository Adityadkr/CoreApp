import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormioModule } from 'angular-formio';
import { UiBuilderComponent } from './ui-builder/ui-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { EntityBuilderComponent } from './entity-builder/entity-builder.component';
import { StepFormComponent } from './step-form/step-form.component';
import { FormComponent } from './form/form.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { AutoCompleteComponent } from './widgets/auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    UiBuilderComponent,
    QueryBuilderComponent,
    EntityBuilderComponent,
    StepFormComponent,
    FormComponent,
    FormArrayComponent,
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    BuilderRoutingModule,FormioModule,FormsModule,ReactiveFormsModule,QueryBuilderModule
  ],
  exports:[StepFormComponent,FormComponent]
})
export class BuilderModule { }
