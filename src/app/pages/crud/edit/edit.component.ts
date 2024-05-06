import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {



  objModule = {
    "vessel": {
      "template": {
        "masterId": "vessel",
        "activeTab": "vesselDetails",
        "tabs": [
          {
            "id": "vesselDetails",
            "label": "Vessel Details",
            "content": {
              "form": {
                "masterKeys": ["TYPE"],
                "controls": [
                  {
                    "name": "id",
                    "type": "hidden",
                    "label": "ID",
                    "value": ""
                  },
                  {
                    "label": "ID",
                    "name": "createdBy",
                    "type": "hidden"
                  },
                  {
                    "label": "ID",
                    "name": "createdDate",
                    "type": "hidden"
                  },
                  {
                    "label": "ID",
                    "name": "updatedBy",
                    "type": "hidden"
                  },
                  {
                    "label": "ID",
                    "name": "updatedDate",
                    "type": "hidden"
                  },
                  {
                    "name": "vesselName",
                    "type": "text",
                    "label": "Vessel Name",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Vessel Name is required."
                      },
                      {
                        "validator": "pattern",
                        "value": "^[a-zA-Z ]*$",
                        "errormessage": "Vessel name should be alphabetic."
                      },
                    ]

                  },

                  {
                    "name": "callSign",
                    "type": "date",
                    "label": "Call Sign",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Vessel Name is required."
                      }]
                  },
                  {
                    "name": "type",
                    "type": "dropdown",
                    "label": "Type",
                    "value": "",
                    "key": "TYPE",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Vessel Name is required."
                      }]
                    //"behaviour":"",
                    // "options": [
                    //   {
                    //     key: 1, value: "Type 1"
                    //   },
                    //   {
                    //     key: 2, value: "Type 2"
                    //   }
                    // ]
                  },
                  {
                    "name": "imoNo",
                    "type": "number",
                    "label": "Imo No.",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Imo no is required."
                      },

                      {
                        "validator": "min",
                        "value": 1,
                        "errormessage": "Imo no cannot be less than 0"
                      },
                      {
                        "validator": "max",
                        "value": 9999,
                        "errormessage": "Imo no cannot be more than 9999"
                      },
                    ],
                    "conditionalValidators": [
                      {
                        "type": "enable_disable",
                        "event": "change",
                        "action": "disable",
                        "controls": ['nameOfHullInsurance'],
                        "condition": "imoNo > 10 && imoNo <20"
                      }
                    ]

                  },
                  {
                    "name": "nameOfHullInsurance",
                    "type": "text",
                    "label": "Name of Hull Insurance",
                    "value": "",

                  },
                  {
                    "name": "piClubDetails",
                    "type": "array",
                    "label": "PI Club Details",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "PI Club Details is required."
                      },
                    ],
                    "fields": [
                      {
                        "label": "ID",
                        "name": "id",
                        "type": "hidden"
                      },
                      {
                        "label": "PI Club Name",
                        "name": "piClubName",
                        "type": "text"
                      },
                      {
                        "label": "PI Club Type",
                        "name": "piClubType",
                        "type": "text"
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
  patchData: any = {}
  module: string;
  constructor(private _http: HttpClient, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.module = this._router.url.split('/')[1].toString()
    this.loadDetails(this._activatedRoute.snapshot.paramMap.get('id'))
  }

  loadDetails(id) {
    this._http.get("http://localhost:8080/" + this.module + "/" + id).subscribe(resp => {
      this.patchData = resp;
    })
  }
  submit(e) {
    // alert(JSON.stringify(e))
    this._http.post("http://localhost:8080/" + this.module, e).subscribe(resp => {
      alert("Data Updated Successfully!!");
      this._router.navigateByUrl(this.module + "/list")
    })
  }
  goto(e) {
    this._router.navigateByUrl(this.module + "/" + e)
  }
}
