
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() id: string = "default"
  @Input() columns: number = 1
  @Input() data: any = null
  @Input() formTemplate: any;
  @Input() isStepForm: boolean = false;

  @Output() changedControl: any = new EventEmitter<any>();
  @Output() onSubmit: any = new EventEmitter<any>();
  @Output() checkState: any = new EventEmitter<any>();
  submitted: boolean = false;
  public myForm: FormGroup = this.fb.group({})
  constructor(private fb: FormBuilder, private cdref: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit() {
    //await this.loadIntialValuesForCascadingDrodownns();
    this.createForm(this.formTemplate)
    if (this.data != null) {

      // this.myForm.setValue(this.data)



    }



    // await this.myForm.patchValue(this.data)
  }
  createForm(formTemplate: any) {
    this.loadIntialValuesForCascadingDrodownns();
    for (const control of formTemplate.controls) {

      debugger


      const validatorsToAdd = [];
      const lstValidators: string[] = [];

      if (control?.validators?.length > 0) {
        for (let item of control.validators) {
          let key = item.validator

          switch (key) {
            case 'min':
              //debugger
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
        if (control.type == 'array') {
          this.myForm.addControl(
            control.name,
            this.fb.array(control.value ? [control.value] : [], validatorsToAdd)
          );
        }
        else {
          this.myForm.addControl(
            control.name,
            this.fb.control(control.value, validatorsToAdd)
          );
        }

        lstValidators.length = 0;
      }
      else{
        if (control.type == 'array') {
          this.myForm.addControl(
            control.name,
            this.fb.array(control.value ? [control.value] : [])
          );
        }
        else {
          this.myForm.addControl(
            control.name,
            this.fb.control(control.value)
          );
        }
      }
    }

    //this.myForm.setValue(this.data, {emitEvent: true, onlySelf: true})


  }
  submit() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.onSubmit.emit(this.myForm.value)
    }
    else {
      return
    }
  }
  get f() {
    return this.myForm.controls;
  }
  checkError(control: string) {
    return !!this.myForm.controls[control]?.errors;
  }

  event(control: any, event: string) {
    //alert(this.myForm.get(control)?.value)
    console.log(control, event)
    this.changedControl.emit({ event: event, control: control, value: this.myForm.controls[control].value })
  }

  hasEvent(control: string, event: string) {
    debugger
    // var frm = []
    // frm = JSON.parse(JSON.stringify(this.formTemplate.controls)) as Array<any>
    // return !!frm.find(x => x.name == control).events?.includes(event)
    const oControl = this.formTemplate.controls.find(x => x.name == control);
    if (oControl?.conditonalValidatiors) {
      if (oControl.conditonalValidatiors.length > 0) {
        const oEvents = oControl.conditonalValidatiors.filter(x => x.event == event);
        oEvents.forEach(element => {
          this.handleEvents(element, oControl);
        });
      }
    }

  }
  handleEvents(e, oControl) {
    switch (e.type) {
      case 'enable_disable':
        this.enableDisable(e, oControl)
        break;
      case 'banana':
        console.log('Selected fruit is banana');
        break;
      case 'orange':
        console.log('Selected fruit is orange');
        break;
      default:
        console.log('Unknown fruit');
    }
  }

  enableDisable(e, oControl) {
    if (e.condition.toString().includes("null")) {
      debugger
      const condition = e.condition.replaceAll(/\b(\w+)\b/g, (match, controlName) => {
        const control = this.formTemplate.controls.find(c => c.name === controlName);
        return control ? `this.myForm.get('${controlName}').value` : match;
      });

      //  const condition = e.condition.replaceAll(oControl.name, "this.myForm.get('" + oControl.name + "').value")
      if (eval(condition)) {
        e.controls.forEach(element => {
          this.myForm.get(element).disable()
        });
      }
      else {
        e.controls.forEach(element => {
          this.myForm.get(element).enable()
        });
      }
    }
    else {

    }
  }
  ngOnChanges(changes: SimpleChanges) {

    //debugger
    console.log('formasd', changes['formTemplate']?.currentValue);
    this.myForm.patchValue(changes['data']?.currentValue)
    setTimeout(() => {

      this.patchValueToCascadedDropDowns();
    }, 1);



    // this.cdref.detectChanges();

  }
  ngAfterViewInit() {

    if (this.data != null) {
      this.myForm.patchValue(this.data)
      setTimeout(() => {

        this.patchValueToCascadedDropDowns();
      }, 1);
    }

  }

  getState() {
    return (this.myForm.status)
  }

  getCurrentFormValue() {
    return this.myForm.value;
  }
  getMaster(e) {
    return this.formTemplate.masters.filter(x => x.type == e);
  }

  //#region Cascading DropDowns
  loadIntialValuesForCascadingDrodownns() {
    const intialCascades = this.formTemplate.controls.filter(x => x.behaviour == 'cascade' && x['configcascade'].order == 1)
    intialCascades.forEach(element => {
      this.formTemplate.controls[this.formTemplate.controls.findIndex(x => x.name == element.name)]['options'] = this.formTemplate.masters.filter(x => x.type == element['configcascade']?.key)

    });
  }
  cascade(e) {
    debugger
    const currentControlIndex = this.formTemplate.controls.findIndex(x => x.name == e.name)
    // const currentControl = this.formTemplate.controls.filter(x => x.name == e.name)
    const dependentDropdowns = this.formTemplate.controls.filter(x => x.behaviour == 'cascade' && x['configcascade']?.group == e['configcascade']?.group).sort((a, b) => a['configcascade'].order - b['configcascade'].order);
    //Empties all dropdowns dependent on current control
    debugger
    dependentDropdowns.forEach(element => {
      if (element['configcascade']?.order > e['configcascade']?.order) {
        this.myForm.get(element.name).reset();
        this.formTemplate.controls[this.formTemplate.controls.findIndex(x => x.name == element.name)]['options'] = []
      }
    });
    //Binds data to next dependent dropdown
    this.formTemplate.controls[currentControlIndex + 1]['options'] = this.formTemplate?.masters?.filter(x => x.type == this.formTemplate.controls[currentControlIndex + 1]['configcascade'].key && x?.parent == this.myForm.get(e.name)?.value)




  }
  patchValueToCascadedDropDowns() {

    const intialCascades = this.formTemplate.controls.filter(x => x.behaviour == 'cascade')
    intialCascades.forEach(element => {
      // this.formTemplate.controls[this.formTemplate.controls.findIndex(x => x.name == element.name)]['options'] = this.formTemplate.masters.filter(x => x.type == element['configcascade']?.key)
      const currentControlIndex = this.formTemplate.controls.findIndex(x => x.name == element.name)

      const currentValue = this.myForm.get(element.name).value

      this.formTemplate.controls[currentControlIndex + 1]['options'] = this.formTemplate?.masters?.filter(x => x.type == this.formTemplate.controls[currentControlIndex + 1]['configcascade'].key && x?.parent == currentValue)

    });
  }
  //#endregion
  getMinDate(e) {
    
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

