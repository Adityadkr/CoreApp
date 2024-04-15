import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddComponent } from 'src/app/pages/crud/add/add.component';
import { EditComponent } from 'src/app/pages/crud/edit/edit.component';
import { ListComponent } from 'src/app/pages/crud/list/list.component';
import { ViewComponent } from 'src/app/pages/crud/view/view.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private _router: Router) { }

  loadRoutes(role) {
    debugger
    //gets routes and access via api
    this._router.resetConfig(this._router.config.filter(x=>x.data?.['default'] == true))
    let routes = this._router.config;

    if (role == 'SA') {
      this._router.config.push(
        {
          path: "vessel-profile-add",
          component: AddComponent,
          data: {
            showOnMenu: false,
            name:"Vessel Profile Add"
          }
        },
        {
          path: "vessel-profile/vessel-profile-edit",
          component: EditComponent,
          data: {
            showOnMenu: false,
            name:"Vessel Profile Edit"
          }

        },
        {
          path: "vessel-profile/vessel-profile-view",
          component: ViewComponent,
          data: {
            showOnMenu: false,
            name:"Vessel Profile View"
          }
        },
        {
          path: "vessel-profile/vessel-profile-list",
          component: ListComponent,
          data: {
            showOnMenu: true,
            name:"Vessel Profile List"
          }
        }
      )

    }
    else if (role == 'PO') {
      this._router.config.push(
        {
          path: "berth-management/berth-management-add",
          component: AddComponent,
          data: {
            showOnMenu: false,
            name:"Berth Management Add"
          }
        },
        {
          path: "berth-management/berth-management-edit",
          component: EditComponent,
          data: {
            showOnMenu: false,
            name:"Berth Management Edit"

          }

        },
        {
          path: "berth-management/berth-management-view",
          component: ViewComponent,
          data: {
            showOnMenu: false,
            name:"Berth Management View"

          }
        },
        {
          path: "berth-management/berth-management-list",
          component: ListComponent,
          data: {
            showOnMenu: true,
            name:"Berth Management List"

          }
        }
      )
    }
    else {

    }
     this._router.resetConfig(this._router.config)
  }
}
