import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../shared/schedule.model';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: Schedule[];
  isPro = false;
  isAdmin = false;

  matchData = {
    startTime: null,
    endTime: null,
    team1: null,
    team2: null,
  };

  messages = {
    success: null,
    alert: null,
  };

  headElements1 = ['id', 'Starting', 'Team 1', 'Result 1', 'Result 2', 'Team 2', 'Ending'];

  headElements2 = ['id', 'Starting', 'Team 1', 'Results', 'Team 2', 'Ending'];

  constructor(private http: HttpClient, private dataService: DataService,
              private authService: AuthService) { }

  ngOnInit() {
    const offset = moment().utcOffset();

    this.dataService.scheduleData().subscribe(res => {
      const copy = res;
      copy.forEach((el, index) => {
        copy[index].endTime = moment(el.endTime).add(offset, 'm').toISOString().slice(0, 16).replace('T', ' ');
        copy[index].startTime = moment(el.startTime).add(offset, 'm').toISOString().slice(0, 16).replace('T', ' ');
      });
      this.schedule = copy;
    });
    this.isPro = this.authService.user.value.isPro;
    this.isAdmin = this.authService.user.value.isAdmin;
  }

  onAddingNewMatch(form: NgForm) {
    const time1 = new Date(form.value.startTime).toISOString();
    const time2 = moment(time1).add(105, 'm').toISOString();

    this.matchData.startTime = time1;
    this.matchData.endTime = time2;
    this.matchData.team1 = form.value.team1;
    this.matchData.team2 = form.value.team2;

    this.dataService.addMatch(this.matchData).subscribe(res => {

    });
  }

  onUpdateResult(form: NgForm) {
    this.messages.alert = null;
    this.messages.success = null;
    const typed = Object.assign({}, this.schedule[form.value.index]);

    typed.result1 = form.value.result1;
    typed.result2 = form.value.result2;

    this.dataService.updateResult(typed).subscribe(res => {
      this.messages.success = 'Match result updated and saved in database';
    }, (err) => {
      console.log(err);
      this.messages.alert = err;
    });
  }

}
