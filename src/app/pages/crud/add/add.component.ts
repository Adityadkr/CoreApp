import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  template = {
    "masterId": "vessel",
    "activeTab": "vesselDetails",
    "tabs": [
      {
        "id": "vesselDetails",
        "label": "Vessel Details",
        "content": {
          "form": {
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
                "value": ""
              },
              {
                "name": "callSign",
                "type": "text",
                "label": "Call Sign",
                "value": ""
              },
              {
                "name": "type",
                "type": "text",
                "label": "Type",
                "value": ""
              },
              {
                "name": "imoNo",
                "type": "text",
                "label": "Imo No.",
                "value": ""
              },
              {
                "name": "nameOfHullInsurance",
                "type": "text",
                "label": "Name of Hull Insurance",
                "value": ""
              },
              {
                "name": "piClubDetails",
                "type": "array",
                "label": "PI Club Details",
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
  patchData: any ={}
  // data = {
  //   activeTab: "berthDetails",
  //   tabs: [
  //     {
  //       id: 'berthDetails', label: 'Berth Details',
  //       content: {
  //         title: "1",
  //         form: {
  //           "controls": [
  //             {
  //               "name": "vcn",
  //               "label": "VCN",
  //               "value": "",
  //               "type": "text",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Vcn is required."
  //                 },
  //                 {
  //                   "validator": "minlength",
  //                   "value": 10,
  //                   "errormessage": "Vcn should be 10 characters long."
  //                 }],
  //               "conditonalValidatiors": [
  //                 {
  //                   "type": "enable_disable",
  //                   "event": "change",
  //                   "action": "disable",
  //                   "controls": ['vesselName'],
  //                   "condition": "vcn != null && vcn == ''"
  //                 }
  //               ]

  //             },
  //             {
  //               "name": "imo",
  //               "label": "Imo No.",
  //               "value": "",
  //               "type": "number",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Imo no. is required."
  //                 },
  //                 {
  //                   "validator": "min",
  //                   "value": 0,
  //                   "errormessage": "Imo no. cannot be 0."
  //                 }
  //               ],
  //               "conditonalValidatiors": [
  //                 {
  //                   "type": "enable_disable",
  //                   "event": "change",
  //                   "action": "disable",
  //                   "controls": ['vesselName'],
  //                   "condition": "(vcn != null && vcn != '') && imo == 5"
  //                 }
  //               ]

  //             },
  //             {
  //               "name": "vesselName",
  //               "label": "Vessel Name",
  //               "value": "",
  //               "type": "text",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Vessel Name is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "expectedDateOfBerthing",
  //               "label": "Expected Date of Berthing",
  //               "value": "",
  //               "type": "date",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Expected Date of Berthing is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "vesselType",
  //               "label": "Vessel Type",
  //               "value": "",
  //               "type": "dropdown",
  //               "key": "VESSEL_TYPE",
  //               "options": [
  //                 // { key: 'IND', value: 'India' },
  //                 // { key: 'USA', value: 'America' },
  //                 // { key: 'CAN', value: 'Canada' },
  //               ],
  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Vessel Type is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "action",
  //               "label": "Action",
  //               "value": "",
  //               "type": "dropdown",
  //               "key": "BERTH_TYPE",
  //               "options": [
  //                 // { key: 'IND', value: 'India' },
  //                 // { key: 'USA', value: 'America' },
  //                 // { key: 'CAN', value: 'Canada' },
  //               ],
  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Action is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "country",
  //               "label": "Country",
  //               "value": "",
  //               "type": "dropdown",
  //               "behaviour": "cascade",
  //               "configcascade": {
  //                 "group": "location",
  //                 "order": 1,
  //                 "url": "",
  //                 "key": "COUNTRY",
  //               },
  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Country is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "state",
  //               "label": "State",
  //               "value": "",
  //               "type": "dropdown",
  //               "behaviour": "cascade",
  //               "configcascade": {
  //                 "group": "location",
  //                 "order": 2,
  //                 "url": "",
  //                 "key": "STATE",
  //               },
  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "State is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "city",
  //               "label": "City",
  //               "value": "",
  //               "type": "dropdown",
  //               "behaviour": "cascade",
  //               "configcascade": {
  //                 "group": "location",
  //                 "order": 3,
  //                 "url": "",
  //                 "key": "CITY",
  //               },
  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "City is required."
  //                 }
  //               ],

  //             },
  //             {
  //               "name": "dob",
  //               "label": "Date of Birth",
  //               "type": "date",
  //               "validators": [
  //                 {
  //                   validator: "required",
  //                   "errormessage": "Date of Birth is required"
  //                 },
  //                 {
  //                   validator: "min",
  //                   value: new Date().toISOString().substring(0, 16),
  //                   // value:"2023-04-05",
  //                   "message": "Date shoud"
  //                 }
  //               ]
  //             },
  //             {
  //               "name": "berthDetails",
  //               "label": "Expected Date of Berthing",
  //               "value": "",
  //               "type": "array",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Berthing Details are required."
  //                 }
  //               ],
  //               "fields": [
  //                 {
  //                   "name": "firstName",
  //                   "label": "First Name",
  //                   "type": "text",
  //                   "validators": [
  //                     {
  //                       "required": true,
  //                       "message": "First name is required."
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "name": "lastName",
  //                   "label": "Last Name",
  //                   "type": "number",
  //                   "validators": [
  //                     {
  //                       validator: "required",
  //                       "message": "Last name is required."
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "name": "dob",
  //                   "label": "Date of Birth",
  //                   "type": "datetime-local",
  //                   "validators": [
  //                     {
  //                       validator: "required",
  //                       "message": "Date shoud"
  //                     },
  //                     {
  //                       validator: "min",
  //                       value:  new Date().toISOString().substring(0, 16),
  //                       // value:"2023-04-05 04:10",
  //                       "errormessage": "Date shoud"
  //                     }
  //                   ]
  //                 }
  //               ]


  //             },
  //           ],
  //           "masters": [
  //             { "type": "VESSEL_TYPE", "key": "mil", "value": "Military" },
  //             { "type": "VESSEL_TYPE", "key": "reg", "value": "Regular" },
  //             { "type": "BERTH_TYPE", "key": "A01", "value": "Anchorage" },
  //             { "type": "BERTH_TYPE", "key": "A02", "value": "Berth" },
  //             { "id": 1, "type": "COUNTRY", "key": "IND", "value": "India" },
  //             { "id": 2, "type": "COUNTRY", "key": "CHN", "value": "China" },
  //             { "id": 3, "type": "STATE", "key": "MAH", "value": "Maharashtra", "parent": 1 },
  //             { "id": 8, "type": "STATE", "key": "CHEN", "value": "Chennai", "parent": 1 },
  //             { "id": 4, "type": "STATE", "key": "HAI", "value": "Hainan", "parent": 2 },
  //             { "id": 5, "type": "CITY", "key": "MUM", "value": "Mumbai", "parent": 3 },
  //             { "id": 5, "type": "CITY", "key": "THN", "value": "Thane", "parent": 3 },
  //             { "id": 6, "type": "CITY", "key": "FUJ", "value": "Fujian", "parent": 4 },
  //             { "id": 7, "type": "CITY", "key": "SHA", "value": "Shadong", "parent": 4 },
  //             { "id": 9, "type": "CITY", "key": "BAN", "value": "Banglore", "parent": 8 },
  //           ]
  //         }
  //       }
  //     },
  //     {
  //       id: 'vesselDetails', label: 'Vessel Details',
  //       content: {
  //         title: "2",
  //         form: {
  //           "controls": [
  //             {
  //               "name": "pd",
  //               "label": "Present Displacement(Mtrs)",
  //               "value": "",
  //               "type": "number",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Present Displacement(Mtrs) is required."
  //                 },
  //                 {
  //                   "validator": "min",
  //                   "value": 1,
  //                   "errormessage": "Present Displacement(Mtrs) cannot be less than 1"
  //                 }
  //               ],
  //               "events": ["change"]
  //             },
  //             {
  //               "name": "dfwd",
  //               "label": "Draft Fwd(Mtrs)",
  //               "value": "",
  //               "type": "number",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Draft Fwd(Mtrs) is required."
  //                 },
  //                 {
  //                   "validator": "min",
  //                   "value": 1,
  //                   "errormessage": "Draft Fwd(Mtrs) cannot be less than 1"
  //                 }
  //               ],
  //               "events": ["change"]
  //             }, {
  //               "name": "daft",
  //               "label": "Draft AFT(Mtrs)",
  //               "value": "",
  //               "type": "number",

  //               "validators": [
  //                 {
  //                   "validator": "required",
  //                   "errormessage": "Draft AFT(Mtrs) is required."
  //                 },
  //                 {
  //                   "validator": "min",
  //                   "value": 1,
  //                   "errormessage": "Draft AFT(Mtrs) cannot be less than 1"
  //                 }
  //               ],
  //               "events": ["change"]
  //             }
  //           ]
  //         }
  //       }
  //     },
  //     {
  //       id: 'grab', label: 'Grab Details',
  //       content: {
  //         title: "3",
  //         form: {
  //           controls: [{
  //             "name": "Gender",
  //             "label": "Please select your gender.",
  //             "value": null,
  //             "type": "radio",
  //             "options": [
  //               { key: 'M', value: 'Male' },
  //               { key: 'F', value: 'Female' },
  //               { key: 'O', value: 'Other' },
  //             ],
  //             "validators": [
  //               { "validator": "required", "errormessage": "Gender is required" }
  //             ]
  //           }],
  //         }
  //       }
  //     }
  //   ]
  // }
  constructor() { }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
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

}
