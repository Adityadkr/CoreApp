import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthorizationService, public _router: Router) {


  }

  ngOnInit(): void {
  }
  login(e) {

    this._auth.loadRoutes(e);
    localStorage.setItem("isLoggedIn",'1');
    this._router.navigate(['dashboard'])
  }
}
