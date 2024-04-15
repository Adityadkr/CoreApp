import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
  moduleForm: any;
  operationForm: any;
  badges = [];
  dropdownItems = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' }
  ];
  //stakeholderTypesArray: any= []
  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.moduleForm = this.fb.group({
      moduleName: ['', Validators.required],
      moduleDescription: [''],
      operations: this.fb.array([]),
      stakeholders: this.fb.array([]),
      routes: this.fb.array([]),
      linkedFormId: [],
      grids: this.fb.array([])
    });

    this.operationForm = this.fb.group({
      create: new FormControl(false),
      update: new FormControl(false),
      delete: new FormControl(false),
      view: new FormControl(false),
      approve: new FormControl(false),
      reject: new FormControl(false)
    });
  }

  addOperation() {
    const operations = this.moduleForm.get('operations') as FormArray;
    operations.push(this.fb.control(''));
  }

  removeOperation(index: number) {
    const operations = this.moduleForm.get('operations') as FormArray;
    operations.removeAt(index);
  }

  addStakeholder() {
    const stakeholders = this.moduleForm.get('stakeholders') as FormArray;
    stakeholders.push(this.fb.group({
      name: ['', Validators.required],
      role: [''],
      operations: this.fb.array([])
    }));
  }

  removeStakeholder(index: number) {
    const stakeholders = this.moduleForm.get('stakeholders') as FormArray;
    stakeholders.removeAt(index);
  }

  addStakeholderOperation(stakeholderIndex: number) {
    const stakeholders = this.moduleForm.get('stakeholders') as FormArray;
    const operations = stakeholders.at(stakeholderIndex).get('operations') as FormArray;
    operations.push(this.fb.control(''));
  }

  removeStakeholderOperation(stakeholderIndex: number, operationIndex: number) {
    const stakeholders = this.moduleForm.get('stakeholders') as FormArray;
    const operations = stakeholders.at(stakeholderIndex).get('operations') as FormArray;
    operations.removeAt(operationIndex);
  }

  openStakeholdersModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openOperationsModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onSubmit() {
    alert(JSON.stringify(this.moduleForm.value));
    if (this.moduleForm.valid) {
      // Perform actions like sending data to backend or handling form submission
    } else {
      // Handle form validation errors
    }
  }

  onOperationsSubmit() {

    this.getOperationBadges()
    this.moduleForm.get('operations').setValue(this.operationForm.value)
    // You can perform further actions with the form values here
  }

  async getOperationBadges() {

    this.badges = []
    const keys = Object.keys(this.operationForm.controls)
    await keys.forEach(element => {
      if (this.operationForm.get(element).value) {
        this.badges.push(element)
      }
    });
    await this.addGenericRoutes();
    console.log(this.badges)

  }

  addGenericRoutes() {
    const routes = this.moduleForm.get("routes") as FormArray;
    routes.clear()
    this.badges.forEach(element => {
      if (['create', 'update', 'view'].includes(element)) {
        const form = this.fb.group({
          operation: [element],
          route: [this.moduleForm.value?.moduleName?.trim().replaceAll(" ", "-").toLowerCase() + '-' + element],
          isMenuItem: [false],
          menuName: [this.moduleForm.value?.moduleName?.trim() + ' ' + element]
        })


        routes.push(form)
      }

    });
    routes.push(
      this.fb.group({
        operation: ["list"],
        route: [this.moduleForm.value?.moduleName?.trim().replaceAll(" ", "-").toLowerCase() + '-' + "list"],
        isMenuItem: [true],
        menuName: [this.moduleForm.value?.moduleName?.trim() + ' ' + "List"]
      }))
  }
  onChange(type: string, isChecked: boolean) {
    const stakeholderTypesArray = this.moduleForm.get('stakeholders') as FormArray
    if (isChecked) {
      stakeholderTypesArray.push(this.fb.control(type));
    } else {
      const index = stakeholderTypesArray.controls.findIndex(x => x.value === type);
      stakeholderTypesArray.removeAt(index);
    }
  }
  submitStakeholders() {

    const grid = this.moduleForm.get('grids') as FormArray;
    this.moduleForm.get('stakeholders').value.forEach(element => {
      grid.push(
        this.fb.group({
          stakeholderType: [element],
          gridId: [null]
        })
      )
    });
    this.modalService.dismissAll()
  }
}




