import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPanelPackage } from '../shared/userPanelPackage.model';
import { GroupData } from '../shared/groupData.model';
import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  data: UserPanelPackage;
  groupName: string;
  groupData: GroupData;


  invMessage = {
    resp: null,
    err: null,
  };

  headElements = ['ID', 'Username', 'Group Name', 'Accept / Reject'];

  invitationsPending: [{}];

  invitationsRecieved: [{}];

  constructor(private http: HttpClient, private dataService: DataService ) { }

  ngOnInit() {

    this.dataService.initData().subscribe(res1 => {
      this.data = res1;
      this.invitationsPending = this.data.invitations.invOUT;
      this.invitationsRecieved = this.data.invitations.invIN;
    });
  }

  onGroupCreation(form: NgForm) {
    this.dataService.createGroup(form.value.groupName).subscribe(data => {
      this.data.groupCreation = null;
      this.ngOnInit();
    });
  }

  onSendingInv(form: NgForm) {
    this.invMessage.err = null;
    this.invMessage.resp = null;
    const nickname = form.value.sendingInv;
    this.dataService.invSending(nickname).subscribe(data => {
      this.invMessage.resp = 'Invitation sended';
      this.invitationsPending.push(data.obj);
    }, err => {
      this.invMessage.err = err;
    });
  }

  onInvAccept(i: any) {
    this.dataService.recInvAccept(this.invitationsRecieved[i]).subscribe(res => {
      this.ngOnInit();
    }, err => {
    });
  }

  onInvReject(i: any) {
    this.dataService.recInvReject(this.invitationsRecieved[i]).subscribe(
      res => {
        this.invitationsRecieved.splice(i, 1);
      }, err => {
      }
    );
  }

  onPendInvReject(i: any) {
    this.dataService.pendInvReject(this.invitationsPending[i]).subscribe(res => {
      this.invMessage.resp = 'Invitation successfully canceled';
      this.invitationsPending.splice(i, 1);
    });
  }

}
