import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entity-builder',
  templateUrl: './entity-builder.component.html',
  styleUrls: ['./entity-builder.component.css']
})
export class EntityBuilderComponent implements OnInit {

  frmEntity: any;
  frmValidation: any;
  @ViewChild("keysModal") keysModal!: ElementRef;
  frmKeys: any;
  constructor(public _ngModal: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.frmEntity = this._fb.group({
      entityName: [null],
      keys: this._fb.array([])
    })
    this.frmKeys = this._fb.group({
      keyName: [null],
      validation: this._fb.array([])
    })


  }

  getFromGroupInstance(e) {
    return e as FormGroup;
  }
  getKeysForm() {
    return this.frmKeys = this._fb.group({
      keyName: [null],
      validation: this._fb.array([])
    })
  }

  getValidationForm() {
    return this._fb.group({
      type: [null],
      value: [null]
    })
  }

  getValidations() {
    return this.frmKeys.get('validation') as FormArray;
  }
  getValidationFromArray(i) {
    return ((this.frmEntity.get("keys") as FormArray).at(i).get("validation") as FormArray);

  }
  AddValidation() {
    const add = (this.frmKeys.get("validation") as FormArray)
    add.push(this.getValidationForm())
    console.log(this.frmKeys)
  }

  openKeysModal() {
    // (this.frmEntity.get("keys") as FormArray).push(this.getKeysForm())
    this._ngModal.open(this.keysModal);
    console.log(this.frmEntity)
  }

  save() {
    alert(JSON.stringify(this.frmKeys.value))
  }

}
