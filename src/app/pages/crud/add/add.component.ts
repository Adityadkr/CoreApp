import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


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
                    "name": "vesselId",
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
                    "type": "text",
                    "label": "Type",
                    "value": "",
                    "key": "TYPE",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Type is required."
                      }],
                    //"behaviour":"",
                    "options": [
                      {
                        key: 1, value: "Type 1"
                      },
                      {
                        key: 2, value: "Type 2"
                      }
                    ]
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
    },
    "voyage": {
      "template": {
        "masterId": "voyage",
        "activeTab": "voyageDetails",
        "tabs": [
          {
            "id": "voyageDetails",
            "label": "Voyage Details",
            "content": {
              "form": {
                "controls": [
                  {
                    "name": "voyageId",
                    "type": "hidden"
                  },
                  {
                    "name": "vessel",
                    "type": "hidden"
                  },
                  {
                    "name": "vcn",
                    "type": "text",
                    "label": "VCN",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "VCN is required."
                      }
                    ]
                  },
                  {
                    "name": "imoNo",
                    "type": "imoNo",
                    "label": "Imo No.",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Imo is required."
                      }
                    ],
                    "dependent": "vessel"
                  },
                  {
                    "name": "purposeOfVisit",
                    "type": "text",
                    "label": "Purpose of Visit",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Purpose of visit is required."
                      }
                    ]
                  },
                  {
                    "name": "vesselName",
                    "type": "text",
                    "label": "Vessel Name",
                    "value": "",
                    "dependent": "vessel",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Vessel Name is required."
                      }
                    ]
                  },
                  {
                    "name": "voyageNo",
                    "type": "text",
                    "label": "Voyage No",
                    "value": "",
                    // "dependent": "vessel",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Voyage No is required."
                      }
                    ]
                  },
                  {
                    "name": "eta",
                    "type": "date",
                    "label": "Estimated time of Arrival",
                    "value": "",
                    "validators": [
                      {
                        "validator": "required",
                        "errormessage": "Estimated time of Arrival is required."
                      }
                    ]
                  },
                  // {
                  //   "name": "imoNo",
                  //   "type": "entity",
                  //   "dependent": "vessel"
                  // },
                  {
                    "name": "vesselName",
                    "type": "entityField",
                    "dependent": "vessel"
                  }
                ]
              }
            }
          }
        ]
      }
    },
    "berth": {
      "template": {
        "masterId": "berth",

        "activeTab": "berthDetails",
        "tabs": [
          {
            "id": "berthDetails",
            "label": "Berth Details",
            "content": {
              "form": {
                "controls": [
                  {
                    "name": "berthId",
                    "type": "hidden"
                  },
                  {
                    "name": "voyage",
                    "type": "hidden"
                  },
                  {
                    "name": "vcn",
                    "type": "vcn",
                    "dependent": "voyage",
                    "label": "VCN",
                    "value": "",
                  },
                  {
                    "name": "berthNo",
                    "type": "text",
                    "label": "Berth No.",
                    "value": "",
                  },

                  {
                    "name": "berthName",
                    "type": "text",
                    "label": "Berth Name",
                    "value": "",
                  },
                  {
                    "name": "voyageNo",
                    "type": "text",
                    "label": "Voyage No",
                    "dependent": "voyage"
                  },
                  {
                    "name": "berthCode",
                    "type": "text",
                    "label": "Berth Code",
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
  template: any;
  constructor(private _http: HttpClient, private _router: Router,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.module = this._router.url.split('/')[1].toString()
    this.loadFormByModule()
    console.log(this.objModule[this.module].template)

  }

  loadFormByModule() {
    this._http.get("http://localhost:8080/form/"+this._route.snapshot.data['moduleId']).subscribe((res:any) => {
      debugger
      this.template = JSON.parse(res?.jsonData);
    })
  }

  getById() {
    this.patchData = {
      "id": 4,
      "vesselName": "abhishek ",
      "callSign": "panchal",
      "type": "asd",
      "imoNo": "d",
      "nameOfHullInsurance": "d",
      "createdBy": null,
      "createdDate": null,
      "updatedBy": null,
      "updatedDate": null,
      "orgId": null,
      "branchId": null,
      "portId": null,
      "isActive": null,
      "piClubDetails": [
        {
          "id": 5,
          "piClubName": "2ad",
          "piClubType": "da"
        }
      ]
    }
  }
  submit(e) {
    // alert(JSON.stringify(e))
    this._http.post("http://localhost:8080/" + this.module, e).subscribe(resp => {
      alert("Data Inserted Successfully!!");
      this._router.navigateByUrl(this.module + "/list")
    })
  }

  mockApiCall() {
    this._http.post("", { "keys": ['key1', 'key2'] }).subscribe(resp => {
      this.objModule[this.module].template.tabs["masters"] = resp;
    })
  }

}
