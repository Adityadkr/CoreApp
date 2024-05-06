import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: Object;
  module: string = ''

  constructor(private _http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
    this.module = this._router.url.split('/')[1],toString()
    this.loadList();
  }
  loadList(){
    this._http.get("http://localhost:8080/"+this.module).subscribe(resp=>{
      this.list = resp;
    })
  }
  goto(e){
    this._router.navigateByUrl(this.module+"/"+e)
  }

}
