import { Component } from '@angular/core';
import { AuthorizationService } from './shared/services/authorization/authorization.service';
import { Router } from '@angular/router';
import { AddComponent } from './pages/crud/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoreApp';
  form = { "display": "form", "components": [{ "label": "VCN", "applyMaskOn": "change", "tableView": true, "key": "vcn", "type": "textfield", "input": true }, { "type": "button", "label": "Submit", "key": "submit", "disableOnInvalid": true, "input": true, "tableView": false }] }
  /**
   *
   */
  constructor(private _auth: AuthorizationService, public _router: Router) {


  }
  handleSubmit(e) {
    alert(JSON.stringify(e))
  }
  login(e) {
    
    this._auth.loadRoutes(e);
    this._router.navigate(['vessel-profile/vessel-profile-list'])
  }
}
