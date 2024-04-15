import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ui-builder',
  templateUrl: './ui-builder.component.html',
  styleUrls: ['./ui-builder.component.css']
})
export class UiBuilderComponent implements OnInit {
  colSize = 4;
  pageData = {
    heading: "Vessel Profile",
    cols: [
      // {
      //   colID: "col02",
      //   elements: [
      //     {
      //       type: "button",
      //       text: "Add New",
      //       class: "btn btn-primary"
      //     }
      //   ]

      // }
    ]

  }
  currentItem: any = {
    colID: null,
    elements: []
  }
  elementSettings = {
    id: null,
    text: null
  }
  frmElementSettings: any;
  @ViewChild("content") content!: ElementRef;
  elementType: string;
  constructor(public modal: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.prepareForm()
  }
  prepareForm() {
    this.frmElementSettings = this._fb.group({
      general: this._fb.group({
        id: [null],
        text: [null, [Validators.required]],
      }, [Validators.required]),
      events: this._fb.group({}),
      style: this._fb.group({})
    })
  }
  ngAfterViewInit(): void {
    this.getElement();
    setTimeout(() => {


      //this.createElement('col22')

    }, 3000);
  }

  save(tab) {
    let that = this;
    if (this.frmElementSettings.valid) {
      if (tab == 'general') {

        if (this.frmElementSettings.get('general').valid) {
          const data = this.frmElementSettings.get('general').value;
          this.currentItem.elements.push({
            type: that.elementType,
            general: data
          })
        }


      }
      else if (tab == 'event') {
        this.currentItem.elements[0]['events'] = this.frmElementSettings.get('events').value
      }
      else if (tab == 'style') {
        this.currentItem.elements[0]['style'] = this.frmElementSettings.get('style').value
      }
      else {

      }
    }
    else {
      alert("Please fill general details.")
    }
  }

  saveElement() {
    let that = this
    if (this.frmElementSettings.valid) {
      if (this.frmElementSettings.get('general').valid) {
        const data = this.frmElementSettings.get('general').value;
        this.currentItem.elements.push({
          type: that.elementType,
          general: data
        })
        this.currentItem.elements[0]['events'] = this.frmElementSettings.get('events').value
        this.currentItem.elements[0]['style'] = this.frmElementSettings.get('style').value
        this.saveSettings()
      }
    }
    else {
      alert("Please fill general details.")
    }
  }

  saveSettings() {
    // this.pageData.cols.push({
    //   colID: this.elementSettings.id,
    //   elements: [
    //     {
    //       type: "button",
    //       text: this.elementSettings.text,
    //       class: "btn btn-primary"
    //     }
    //   ]

    // })
    this.pageData.cols.push(this.currentItem)
    this.createElement(this.currentItem.colID)
    this.elementSettings.id = null
    this.elementSettings.text = null
    this.currentItem.colID = null
    this.currentItem.elements = []
    this.modal.dismissAll();
  }


l
  onDragStart(data: string) {
    this.elementType = data;
    this.currentItem.colID = null
    this.currentItem.elements = []
    console.log("Drag started: ", data);
  }

  onDrop(event: DragEvent) {
    console.log("Dropped: ", event);
    this.currentItem.colID = event.currentTarget['id']
    this.modal.open(this.content);


    // Prevent default behavior to enable drop
    event.preventDefault();
  }


  onDragOver(event: DragEvent) {
    // Allow drop by preventing default behavior
    event.preventDefault();
  }
  getElement() {
    this.pageData.cols.forEach(element => {
      this.createElement(element.colID)
    });
  }
  createElement(e) {
    debugger
    const parent = document.getElementById(e);
    const eschema = this.pageData.cols.find(x => x.colID == e);
    if (eschema != undefined) {
      const element = document.createElement(eschema.elements[0].type)
      // element.classList.add("btn");
      // element.classList.add("btn-primary");

      element.innerText = eschema.elements[0].general.text
      parent.innerHTML = ''
      parent.append(element)
    }
  }

}
