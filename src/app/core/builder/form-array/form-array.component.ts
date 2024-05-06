import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  @Input() fields: any[] = [];
  @Input() formArray;
  @Input() controlName;
  @Input() data = [];
  formGroup = new FormGroup({})
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup(this.fields)
    console.log(this.formArray)
  }
  ngAfterViewInit() {
    this.patchData();
  }

  ngOnChanges() {
   this.patchData()
  }
  patchData() {
    //debugger
    this.data?.forEach(element => {
      this.add();
    });
     this.formArray.patchValue(this.data)
  }
  createFormGroup(field: any) {

    //this.createControl(this.fields)

  }

  getFormValue() {
    return this.formArray.value;
  }
  delete(i) {
    this.formArray.removeAt(i);
  }
  add() {
    this.formArray.push(this.createControl(this.fields))
  }
  createControl(formTemplate: any) {
    debugger
    const formGroup = new FormGroup({})
    for (const control of formTemplate) {



      const validatorsToAdd = [];
      const lstValidators: string[] = [];
      
      if (control?.validators?.length > 0) {
        for (let item of control.validators) {
          let key = item.validator
          debugger
          switch (key) {
            case 'min':
              ////debugger
              validatorsToAdd.push(Validators.min(item.value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(item.value));
              break;
            case 'required':
              validatorsToAdd.push(Validators.required);

              break;
            case 'requiredTrue':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            case 'minlength':
              validatorsToAdd.push(Validators.minLength(item.value));
              break;
            case 'maxlength':
              validatorsToAdd.push(Validators.maxLength(item.value));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(item.value));
              break;
            case 'nullValidator':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }
        formGroup.addControl(
          control.name,
          this.fb.control(null, validatorsToAdd)
        );
        lstValidators.length = 0;
      }
      else {
        formGroup.addControl(
          control.name,
          this.fb.control(null)
        );
      }
    }
    return formGroup
  }
  getMinDate(e) {
    debugger
    const minDate = e?.find(x => x.validator == 'min')
    if (minDate) {
      return minDate?.value
    }
    return null
  }
  getMaxDate(e) {
    const maxDate = e?.find(x => x.validator == 'max')
    if (maxDate) {
      return maxDate?.value
    }
    return null
  }
}
