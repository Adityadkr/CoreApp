import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {

  file: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {

  }

  upload(event) {
    let workBook: any = null;
    let jsonData: any[] = [];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      workBook = XLSX.read(data, { type: 'array' });
      const sheetName = workBook.SheetNames[2];
      const sheet = workBook.Sheets[sheetName];
      jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log(JSON.stringify(jsonData))
    };
    reader.readAsArrayBuffer(file);
  }

}
