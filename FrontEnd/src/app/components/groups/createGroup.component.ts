import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupsService } from "./groups.service";

@Component({
  selector: 'app-admin-create-group',
  template: `
    <div *ngIf="isSiteAdmin">
      <label for="groupNameInput">Create a New Group</label>
      <input type="text" id="groupNameInput" class="form-control" maxLength="150" [value]="groupName" #groupNameInput placeholder="New Group Name"
        (keyup)="checkGroupName(groupNameInput.value)" (keyup.enter)="createGroup()"/>
      <div class="alert alert-danger" [hidden]="!groupNameInUse">That Group Name is already in use.</div>
      <div class="mt-1">
        <button class="btn btn-primary" [disabled]="groupName.length < 1 || groupNameInUse" (click)="createGroup()"><i class="fas fa-plus"></i> Create Group</button>
      </div>
    </div>
  `,
  styles: [`
  `]
})

export class CreateGroupComponent implements OnInit {
  @Output()
  public groupCreated = new EventEmitter();
  public groupName = "";
  public groupNameInUse = false;
  public isSiteAdmin = false;
  constructor(
    private groupService: GroupsService
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
  }

  private checkYourPrivelege() {
    this.groupService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isSiteAdmin = response.siteAdmin === "1";
      } else {
        this.isSiteAdmin = false;
      }
    });
  }

  public checkGroupName(groupName: string) {
    this.groupName = groupName;
    this.groupService.checkGroupName(groupName)
      .subscribe((response) => this.groupNameInUse = !!parseInt(response.response, 10));
  }

  public createGroup() {
    if (this.groupNameInUse === false && this.groupName.length > 0) {
      this.groupService.createGroup(this.groupName)
        .subscribe((response: any) => {
          if (response !== "0") {
            this.groupCreated.emit({
              groupId: response,
              groupName: this.groupName
            });
            this.checkGroupName("");
          }
        });
    }
  }
}
