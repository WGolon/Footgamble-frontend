import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  tableHeader = null;
  tableContent = null;
  mainErr = null;

  ngOnInit() {
    this.dataService.resultData().subscribe(res => {
      this.tableHeader = res.tableHeader;
      this.tableContent = res.tableContent;
    }, err => {
      this.mainErr = err;
    });
  }

}
