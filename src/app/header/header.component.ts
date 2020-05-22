import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userSub: Subscription;
  date: string;

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    const offset = moment().utcOffset();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
    this.authService.autoLogin();
    this.dataService.getServerTime().subscribe(res => {
      const timeMod = moment(res.date).add(offset, 'm').toISOString();
      this.clock(timeMod);

    });

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.site-nav');

    burger.addEventListener('click', () => {
      nav.classList.toggle('responsive');
    });

  }

  onLogout() {
    this.authService.logout();
  }

  clock(time) {
    setInterval(() => {
      this.date = time.slice(0, 19).replace('T', '  || Time: ');
      time = moment(time).add(1, 's').toISOString();
    }, 1000);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
