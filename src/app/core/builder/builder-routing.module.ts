import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { UiBuilderComponent } from './ui-builder/ui-builder.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { EntityBuilderComponent } from './entity-builder/entity-builder.component';
import { StepFormComponent } from './step-form/step-form.component';

const routes: Routes = [
  { path: "form-builder", component: FormBuilderComponent },
  { path: "ui-builder", component: UiBuilderComponent },
  { path: "query-builder", component: QueryBuilderComponent },
  { path: "entity-builder", component: EntityBuilderComponent },
  { path: "step-form", component: StepFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
