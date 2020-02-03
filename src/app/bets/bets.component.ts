import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Schedule } from '../shared/schedule.model';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {

  schedule: Schedule[];
  headElements = ['id', 'Starting', 'Team 1', 'Betting', 'Team 2', 'Ending'];
  messages = {
    alert: null,
    success: null,
  };

  mainErr: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const offset = moment().utcOffset();

    this.dataService.betData().subscribe(res => {
      const copy = res;
      copy.forEach((el, index) => {
        copy[index].endTime = moment(el.endTime).add(offset, 'm').toISOString().slice(0, 16).replace('T', ' ');
        copy[index].startTime = moment(el.startTime).add(offset, 'm').toISOString().slice(0, 16).replace('T', ' ');
      });
      this.schedule = copy;

    }, err => {
      this.mainErr = 'At first you have to join a group';
    });
  }

  onBetting(form: NgForm) {
    this.messages.alert = null;
    this.messages.success = null;
    const typed = Object.assign({}, this.schedule[form.value.index]);
    typed.startTime = (new Date(typed.startTime)).toISOString();
    typed.endTime = (new Date(typed.endTime)).toISOString();
    typed.result1 = form.value.result1;
    typed.result2 = form.value.result2;
    this.dataService.betMatch(typed).subscribe(res => {
      this.messages.success = 'Your bet has been saved in database';
    }, err => {

      this.messages.alert = err.error;
    });
  }

}
