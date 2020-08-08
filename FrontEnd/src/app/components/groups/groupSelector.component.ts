import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { GroupsService } from "./groups.service";
import { GroupsModel } from "./groups.models";

@Component({
  selector: 'app-admin-group-selector',
  templateUrl: "./groupSelector.template.html",
  styles: [`
  `]
})

export class GroupSelectorComponent implements OnInit {
  @Output()
  public groupChange = new EventEmitter();
  public groupId: number;
  public selectedGroup: GroupsModel;
  public groups: GroupsModel[] = [];
  public isSiteAdmin = false;
  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
  }

  private checkYourPrivelege() {
    this.groupsService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isSiteAdmin = response.siteAdmin === "1";
        this.getGroups();
      } else {
        this.isSiteAdmin = false;
      }
    });
  }

  private getGroups() {
    this.groupsService.getGroups().subscribe((response: any) => {
      if (response !== "0") {
        this.groups = response.map((group: any) => {
          return new GroupsModel(
            parseInt(group.GroupID, 10),
            group.GroupName
          );
        });
      }
    });
  }

  public selectGroup(group: GroupsModel) {
    this.groupId = group.groupId;
    this.groupChange.emit(this.groupId);
  }
}
