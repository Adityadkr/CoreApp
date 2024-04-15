import { Component, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { convertToMongoPipeline } from './convertToMongo';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  query = {
    condition: 'and',
    rules: [
      { field: 'vcn', operator: '<=', value: '1' },
      { field: 'vesselName', operator: '>=', value: 'm' }
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      vcn: { name: 'VCN', type: 'string' },
      vesselName: { name: 'Vessel Name', type: 'string' },
      createdBy: { name: 'Created By', type: 'string' },
      portId: {
        name: 'Port', type: 'category', options: [
          { name: 'sajbi', value: 'm' },
          { name: 'jeddga', value: 'o' }
        ]
      },
      vesselType: {
        name: 'Vessel Type',
        type: 'category',
        options: [
          { name: 'Military', value: 'm' },
          { name: 'Offshore', value: 'o' }
        ]
      }
    }
  }


  returnMongoQuery(q) {
    return convertToMongoPipeline(q);
  }


}
