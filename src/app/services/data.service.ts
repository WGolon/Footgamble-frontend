import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError} from 'rxjs';

import { Date } from '../shared/date.model';
import { ResultData } from '../shared/resultData.model';
import { GroupData } from '../shared/groupData.model';
import { InvSend } from '../shared/invSend.model';
import { UserPanelPackage } from '../shared/userPanelPackage.model';
import { Schedule } from '../shared/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000';
  // url = '';


  constructor(private http: HttpClient) { }
// GETS below
  initData() {
    return this.http.get<UserPanelPackage>(`${this.url}/api/initData`).pipe(catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  groupData() {
    return this.http.get<GroupData>(`${this.url}/api/groupData`).pipe(catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  scheduleData() {
    return this.http.get<Schedule[]>(`${this.url}/api/scheduleData`).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }
  getServerTime() {
    return this.http.get<Date>(`${this.url}/serverTime`).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  betData() {
    return this.http.get<Schedule[]>(`${this.url}/api/betData`).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  resultData() {
    return this.http.get<ResultData>(`${this.url}/api/resultData`).pipe(catchError(error => {
      return  throwError(error.error.error);
    }));
  }

/// POSTS below
  createGroup(groupName) {
    return this.http.post(`${this.url}/api/createGroup`, {groupName}).pipe(catchError(errorRes => {
      return  throwError(errorRes);
    }));
  }

  invSending(nickname) {
    return this.http.post<InvSend>(`${this.url}/api/invSending`, {nickname}).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  recInvAccept(payload) {
    return this.http.post<InvSend>(`${this.url}/api/recInvAccept`, payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  pendInvReject(payload) {
    return this.http.post<InvSend>(`${this.url}/api/pendInvReject`, payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  recInvReject(payload) {
    return this.http.post<InvSend>(`${this.url}/api/recInvReject`, payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  addMatch(payload) {
    return this.http.post(`${this.url}/api/addMatch`, payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  betMatch(payload) {
    return this.http.post(`${this.url}/api/betMatch`, payload).pipe(catchError(err => {
      return  throwError(err.error);
    }));
  }

  updateResult(payload) {
    return this.http.post(`${this.url}/api/updateResult`, payload).pipe(catchError(err => {
      return  throwError(err.error.error);
    }));
  }

  deleteMatch(payload) {
    return this.http.post(`${this.url}/api/deleteMatch`, payload).pipe(catchError(err => {
      return  throwError(err.error.error);
    }));
  }

}
