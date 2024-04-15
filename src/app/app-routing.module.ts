import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/crud/add/add.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/auth/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "builder",
    loadChildren: () => import('./core/builder/builder.module').then(m => m.BuilderModule),
    data:{
      default:true,
    }
  },
  {
    path: "workflow",
    loadChildren: () => import('./core/workflow/workflow.module').then(m => m.WorkflowModule)
    ,data:{
      default:true,
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      name: "Login", default:true
    }
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      name: "Dashboard", showOnMenu: true, default:true,
    }
  },
  {
    path: "create",
    component: AddComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
