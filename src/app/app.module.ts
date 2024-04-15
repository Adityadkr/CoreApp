import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormioModule } from 'angular-formio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './pages/crud/view/view.component';
import { ListComponent } from './pages/crud/list/list.component';
import { AddComponent } from './pages/crud/add/add.component';
import { EditComponent } from './pages/crud/edit/edit.component';
import { AuthorizationService } from './shared/services/authorization/authorization.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/auth/dashboard/dashboard.component';
import { BuilderModule } from './core/builder/builder.module';
export function initializeApp(initializationService: AuthorizationService) {
  return () => initializationService.loadRoutes("SA");
}
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, FormioModule, HttpClientModule,BuilderModule
  ],
  providers: [
    // AuthorizationService,
    // { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthorizationService], multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
})
export class AppModule { }
