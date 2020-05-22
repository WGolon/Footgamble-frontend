import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})

export class ConfirmComponent implements OnInit {

  //@Input() message: any;
  constructor(private http: HttpClient,
              private dataService: DataService) { }
  message = {
    startTime: '0011-11-11T11:37:00.000Z',
    team1: 'Pol',
    team2: 'Ger',
  };
  matchData = {
    startTime: '',
    endTime: '',
    team1: '',
    team2: '',
  };
  timeDisp = null;

  ngOnInit() {
    this.timeDisp = moment(this.message.startTime).toISOString().slice(0, 16).replace('T', ' ');
    const time1 = new Date(this.message.startTime).toISOString();
    const time2 = moment(time1).add(105, 'm').toISOString();
    this.matchData.startTime = time1;
    this.matchData.endTime = time2;
    this.matchData.team1 = this.message.team1;
    this.matchData.team2 = this.message.team2;

    this.dataService.addMatch(this.matchData).subscribe(res => {

    });

  }

}
