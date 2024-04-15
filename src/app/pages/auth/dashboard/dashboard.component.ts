import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  routes = []
  constructor(public _router: Router) {


  }
  ngOnInit(): void {
    this.routes = this._router.config;
  }
  goTo(e){
    this._router.navigate([e])
  }

}
