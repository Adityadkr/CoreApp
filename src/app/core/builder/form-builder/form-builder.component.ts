import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormioForm } from 'angular-formio';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  form: string;
  frmModule:any;
  @ViewChild("content") content!: ElementRef;
  
  constructor(public modal: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.frmModule = this._fb.group({
      moduleName:[null],
      moduleDescription:[null],
      moduleLink:this._fb.array([])
    })
  }
  formJSON: FormioForm = { display: 'form', components: [] };

 
  handleFormChange(event: any): void {
    if (event?.form) {
      this.form = JSON.stringify(event.form)
      console.log(JSON.stringify(event.form));
    }
  }
  openSaveModal()
  {
    this.modal.open(this.content)
  }
}
