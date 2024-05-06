import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/crud/add/add.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/auth/dashboard/dashboard.component';
import { ListComponent } from './pages/crud/list/list.component';
import { EditComponent } from './pages/crud/edit/edit.component';

const routes: Routes = [
  {
    path: "builder",
    loadChildren: () => import('./core/builder/builder.module').then(m => m.BuilderModule),
    data: {
      default: true,
    }
  },
  {
    path: "workflow",
    loadChildren: () => import('./core/workflow/workflow.module').then(m => m.WorkflowModule)
    , data: {
      default: true,
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      name: "Login", default: true
    }
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      name: "Dashboard", showOnMenu: true, default: true,
    }
  },
  {
    path: "vessel/create",
    component: AddComponent,

  },
  {
    path: "vessel/edit/:id",
    component: EditComponent,

  },
  {
    path: "vessel/list",
    component: ListComponent,
    data: {
      name: "Vessel Profile", showOnMenu: true,
    }

  },
  {
    path: "voyage/create",
    component: AddComponent,

  },
  {
    path: "voyage/edit/:id",
    component: EditComponent,

  },
  {
    path: "voyage/list",
    component: ListComponent,
    data: {
      name: "Voyage", showOnMenu: true,
    }

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
