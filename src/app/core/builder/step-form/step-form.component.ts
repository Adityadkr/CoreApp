import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent implements OnInit {

  // patchData = {
  //   "berthDetails": {
  //     "vcn": "132321321213",
  //     "imo": "1",
  //     "vesselName": "1",
  //     "expectedDateOfBerthing": "2024-04-25",
  //     "vesselType": "reg",
  //     "action": "A01",
  //     "country": "1",
  //     "state": "8",
  //     "city": "9",
  //     "berthDetails": [
  //       {
  //         "firstName": "1",
  //         "lastName": "12"
  //       }
  //     ]
  //   },
  //   "vesselDetails": {
  //     "pd": "1",
  //     "dfwd": "5",
  //     "daft": "5"
  //   },
  //   "grab": {
  //     "Gender": "O"
  //   }
  // }

  //@Input() formTemplate: any;
  @Input() data: any = {}
  @Input() patchData: any = {}
  @Output() onSubmit: any = new EventEmitter<any>();
  activeTab: string = ""
  @ViewChildren('childForm') childForms: QueryList<FormComponent>;
  fields = [
    {
      "name": "firstName",
      "label": "First Name",
      "type": "text",
      "validators": [
        {
          "required": true,
          "message": "First name is required."
        }
      ]
    },
    {
      "name": "lastName",
      "label": "Last Name",
      "type": "text",
      "validators": [
        {
          "required": true,
          "message": "Last name is required."
        }
      ]
    }
  ]
  @Output() formData: any = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    this.loadForm();
    
  }
  ngAfterViewInit(){
  //  this.getFormData();
  }
  loadForm() {
    this.activeTab = this.data.activeTab;
  }
  nextTab() {
    debugger
    const currentIndex = this.data.tabs.findIndex(tab => tab.id === this.activeTab);
    if (this.getCurrentFormStatus(currentIndex) == "VALID") {
      debugger
      if (this.data.tabs.length > (currentIndex + 1)) {
        if (currentIndex < this.data.tabs.length - 1) {
          this.activeTab = this.data.tabs[currentIndex + 1].id;
        }
      }
      else {
        let data = {}
        const childForm = this.childForms.toArray()
        childForm.forEach(element => {
          const currentData = element.getCurrentFormValue();
          data = Object.assign({}, data, currentData);

          //data[element.id] = element.getCurrentFormValue();
        });
        this.onSubmit.emit(data);

      }

    }

  }

  previousTab() {
    const currentIndex = this.data.tabs.findIndex(tab => tab.id === this.activeTab);

    if (currentIndex > 0) {
      this.activeTab = this.data.tabs[currentIndex - 1].id;
    }
  }
  checkIfFirstTab(id) {
    return !!(this.data.tabs[0].id != id)
  }

  getCurrentFormStatus(index: number) {

    // Check if the index is within the range of childForms
    if (index >= 0 && index < this.childForms.length) {
      const childForm = this.childForms.toArray()[index];
      childForm.submitted = true
      return childForm.getState();
    } else {
      return ('Invalid index for child component.');
    }
  }
  tabClick(e) {
    const childForm = this.childForms?.toArray()[e]
    if (childForm?.getState() == 'VALID') {
      return false;
    }
    return true;
  }
  getFormData() {
    let data = {}
    const childForm = this.childForms.toArray()
    childForm.forEach(element => {
      const currentData = element.getCurrentFormValue();
      data = Object.assign({}, data, currentData);

      //data[element.id] = element.getCurrentFormValue();
    });
    return data;
    //this.formData.emit(data)
  }
}
