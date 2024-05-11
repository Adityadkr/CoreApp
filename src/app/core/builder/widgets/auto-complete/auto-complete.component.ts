import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() control: any;
  dummyControl = new FormControl()
  @Input() type: any = 'vcn'
  @Input() dependent: any;
  results: any;
  module: any;
  constructor(private _http: HttpClient,private _router:Router) {


  }
  ngOnInit(): void {
    this.module = this._router.url.split('/')[1].toString()
    this.dummyControl.valueChanges.pipe(
      tap(() => this.results = []), // Empty the results array
      debounceTime(300),
      distinctUntilChanged(),
      //switchMap(query => this._http.get("query"))
    ).subscribe((data: any) => {
      this.control.reset()

      // this.results = [
      //   {
      //     "id": 1,
      //     "vesselName": "Sample Vessel",
      //     "callSign": "SAMPLE",
      //     "type": "Cargo Ship",
      //     "imoNo": "1234567",
      //     "nameOfHullInsurance": "Sample Insurance",
      //     "createdBy": "John Doe",
      //     "createdDate": "2024-04-13T08:00:00.000+00:00",
      //     "updatedBy": "Jane Smith",
      //     "updatedDate": "2024-04-13T08:00:00.000+00:00",
      //     "orgId": "ORG123",
      //     "branchId": "BRANCH456",
      //     "portId": "PORT789",
      //     "isActive": true,
      //     "piClubDetails": []
      //   },
      //   {
      //     "id": 2,
      //     "vesselName": "Example Vessel",
      //     "callSign": "ABC123",
      //     "type": "Cargo Ship",
      //     "imoNo": "1234567",
      //     "nameOfHullInsurance": "Insurance Inc.",
      //     "createdBy": "John Doe",
      //     "createdDate": "2024-04-12T10:00:00.000+00:00",
      //     "updatedBy": "Jane Smith",
      //     "updatedDate": "2024-04-12T12:00:00.000+00:00",
      //     "orgId": "123",
      //     "branchId": "456",
      //     "portId": "789",
      //     "isActive": true,
      //     "piClubDetails": []
      //   },
      //   {
      //     "id": 3,
      //     "vesselName": "Example Vessel",
      //     "callSign": "ABC123",
      //     "type": "Cargo Ship",
      //     "imoNo": "1234567",
      //     "nameOfHullInsurance": "Insurance Inc.",
      //     "createdBy": "John Doe",
      //     "createdDate": "2024-04-12T10:00:00.000+00:00",
      //     "updatedBy": "Jane Smith",
      //     "updatedDate": "2024-04-12T12:00:00.000+00:00",
      //     "orgId": "123",
      //     "branchId": "456",
      //     "portId": "789",
      //     "isActive": true,
      //     "piClubDetails": [
      //       {
      //         "id": 4,
      //         "piClubName": "Another P&I Club",
      //         "piClubType": "Type B"
      //       },
      //       {
      //         "id": 3,
      //         "piClubName": "Example P&I Club",
      //         "piClubType": "Type A"
      //       }
      //     ]
      //   },
      //   {
      //     "id": 4,
      //     "vesselName": "abhishek ",
      //     "callSign": "panchal",
      //     "type": "asd",
      //     "imoNo": "d",
      //     "nameOfHullInsurance": "d",
      //     "createdBy": null,
      //     "createdDate": null,
      //     "updatedBy": null,
      //     "updatedDate": null,
      //     "orgId": null,
      //     "branchId": null,
      //     "portId": null,
      //     "isActive": null,
      //     "piClubDetails": [
      //       {
      //         "id": 5,
      //         "piClubName": "2ad",
      //         "piClubType": "da"
      //       }
      //     ]
      //   },
      //   {
      //     "id": 5,
      //     "vesselName": "abhishek ",
      //     "callSign": "panchal",
      //     "type": "asd",
      //     "imoNo": "d",
      //     "nameOfHullInsurance": "d",
      //     "createdBy": null,
      //     "createdDate": null,
      //     "updatedBy": null,
      //     "updatedDate": null,
      //     "orgId": null,
      //     "branchId": null,
      //     "portId": null,
      //     "isActive": null,
      //     "piClubDetails": [
      //       {
      //         "id": 6,
      //         "piClubName": "2ad",
      //         "piClubType": "da"
      //       }
      //     ]
      //   }
      // ]
      this._http.get("http://localhost:8080/"+this.module+"/getAll"+this.dependent.charAt(0).toUpperCase() + this.dependent.slice(1)).subscribe(resp => {
        this.results = resp;
      })
    });

    /// this.dummyControl.setValue(this.control.value)
  }
  select(e) {

    this.control.setValue(e[this.type])
    this.dummyControl.setValue(e[this.type])
    this.control.parent.patchValue(e);
    this.control.parent.get(this.dependent).setValue(e)
    this.results.length = 0
  }
}

