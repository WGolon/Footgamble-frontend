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


  constructor(private http: HttpClient) { }
// GETS below
  initData() {
    return this.http.get<UserPanelPackage>('http://localhost:3000/api/initData').pipe(catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  groupData() {
    return this.http.get<GroupData>('http://localhost:3000/api/groupData').pipe(catchError(errorRes => {
      return throwError(errorRes);
    }));
  }

  scheduleData() {
    return this.http.get<Schedule[]>('http://localhost:3000/api/scheduleData').pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }
  getServerTime() {
    return this.http.get<Date>('http://localhost:3000/serverTime').pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  betData() {
    return this.http.get<Schedule[]>('http://localhost:3000/api/betData').pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  resultData() {
    return this.http.get<ResultData>('http://localhost:3000/api/resultData').pipe(catchError(error => {
      return  throwError(error.error.error);
    }));
  }

/// POSTS below
  createGroup(groupName) {
    return this.http.post('http://localhost:3000/api/createGroup', {groupName}).pipe(catchError(errorRes => {
      return  throwError(errorRes);
    }));
  }

  invSending(nickname) {
    return this.http.post<InvSend>('http://localhost:3000/api/invSending', {nickname}).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  recInvAccept(payload) {
    return this.http.post<InvSend>('http://localhost:3000/api/recInvAccept', payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  pendInvReject(payload) {
    return this.http.post<InvSend>('http://localhost:3000/api/pendInvReject', payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  recInvReject(payload) {
    return this.http.post<InvSend>('http://localhost:3000/api/recInvReject', payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  addMatch(payload) {
    return this.http.post('http://localhost:3000/api/addMatch', payload).pipe(catchError(errorRes => {
      return  throwError(errorRes.error.message);
    }));
  }

  betMatch(payload) {
    return this.http.post('http://localhost:3000/api/betMatch', payload).pipe(catchError(err => {
      return  throwError(err.error);
    }));
  }

  updateResult(payload) {
    return this.http.post('http://localhost:3000/api/updateResult', payload).pipe(catchError(err => {
      return  throwError(err.error.error);
    }));
  }

}
