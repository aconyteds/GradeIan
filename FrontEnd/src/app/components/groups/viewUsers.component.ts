import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GroupsService } from "./groups.service";
import { GroupUserModel } from "./groups.models";

@Component({
  selector: 'app-admin-groups-users',
  templateUrl: "./viewUsers.template.html",
  styles: [`
  `]
})

export class ViewUsersComponent implements OnInit {
  public groupUsers: GroupUserModel[] = [];
  public selectedUser!: GroupUserModel;
  public isAdmin = false;
  public isSiteAdmin = false;
  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
    this.getGroupUsers();
  }

  private checkYourPrivelege() {
    this.groupsService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isAdmin = response.groupAdmin === "1";
        this.isSiteAdmin = response.groupAdmin === "1";
      } else {
        this.isAdmin = false;
        this.isSiteAdmin = false;
      }
      if (!this.isAdmin && !this.isSiteAdmin) {
        this.router.navigate(["admin"]);
      }
    });
  }

  private getGroupUsers() {
    this.groupsService.getGroupUsers().subscribe((response: any) => {
      if (response !== "0") {
        this.groupUsers = response.map((groupUser: any) => {
          let locked = false;
          if (groupUser.lockout) {
            locked = new Date().getTime() < new Date(groupUser.lockout).getTime();
          }
          return new GroupUserModel(
            groupUser.email,
            groupUser.firstName,
            groupUser.lastName,
            parseInt(groupUser.userID, 10),
            groupUser.userName,
            locked
          );
        });
      }
    });
  }

  public selectUser(selectedUser: GroupUserModel) {
    this.selectedUser = selectedUser;
  }

  public unlockAccount(user: GroupUserModel) {
    if (user.locked) {
      this.groupsService.unlockAccount(user.userID).subscribe((response: any) => {
        if (response.response === "1") {
          user.locked = false;
        }
      });
    }
  }
}
