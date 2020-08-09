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
  public showingUsers: GroupUserModel[] = [];
  public filterString = "";
  private searchableFields: string[] = ["email", "firstName", "lastName", "userName"];
  public isAdmin = false;
  public isSiteAdmin = false;
  public groupId: number;
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
        this.isSiteAdmin = response.siteAdmin === "1";
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
    this.groupsService.getGroupUsers(this.groupId).subscribe((response: any) => {
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
        this.filterUsers("");
      }
    });
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

  public selectGroup(groupId: number) {
    if (groupId !== this.groupId) {
      this.groupId = groupId;
      this.getGroupUsers();
    }
  }

  public filterUsers(filterString: string) {
    this.filterString = filterString;
    if (this.filterString !== "") {
      this.showingUsers = this.groupUsers.filter((user: GroupUserModel) => {
        return this.searchableFields.some((field: string) =>
        user[field] && user[field].toString().toLowerCase().search(this.filterString.toLowerCase()) !== -1);
      });
    } else {
      this.showingUsers = this.groupUsers;
    }
  }
}
