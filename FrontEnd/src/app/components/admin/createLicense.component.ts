import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccessLevelsModel } from "./admin.models";
import { AdminService } from "./admin.service";

@Component({
  selector: 'app-admin-create-license',
  template: `
    <div *ngIf="isGroupAdmin && groupId">
      <div>Create a new License</div>
      <select class="form-control" #accessLevelSelect="ngModel" [ngModel]="accessLevelSelect" (ngModelChange)="selectAccessLevel($event)">
        <option *ngFor="let accessLevel of accessLevels" [ngValue]="accessLevel">{{accessLevel.accessLabel}}</option>
      </select>
      <div class="mt-1">
        <button class="btn btn-primary" [disabled]="!selectedAccessLevel" (click)="createLicense()"><i class="fas fa-key"></i> Create License</button>
      </div>
    </div>
  `,
  styles: [`
  `]
})

export class CreateLicenseComponent implements OnInit {
  @Input()
  public groupId: number;
  @Output()
  public licenseCreated = new EventEmitter();
  public selectedAccessLevel: AccessLevelsModel;
  public accessLevels: AccessLevelsModel[] = [];
  public isGroupAdmin = false;
  constructor(
    private adminService: AdminService
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
  }

  private checkYourPrivelege() {
    this.adminService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isGroupAdmin = response.groupAdmin === "1";
        this.getAccessLevels();
      } else {
        this.isGroupAdmin = false;
      }
    });
  }

  private getAccessLevels() {
    this.adminService.getAccessLevels().subscribe((response: any) => {
      if (response !== "0") {
        this.accessLevels = response.map((accessLevel: any) => {
          return new AccessLevelsModel(
            parseInt(accessLevel.accessId, 10),
            accessLevel.accessLabel
          );
        });
      } else {
        this.accessLevels = [];
      }
    });
  }

  public selectAccessLevel(newAccessLevel: AccessLevelsModel) {
    this.selectedAccessLevel = newAccessLevel;
  }

  public createLicense() {
    console.log(this.groupId, this.selectedAccessLevel);
    if (this.groupId && this.selectedAccessLevel) {
      this.adminService.createLicense(this.selectedAccessLevel.accessId, this.groupId)
        .subscribe((response: any) => {
          if (response !== "0") {
            this.licenseCreated.emit({
              groupId: this.groupId,
              license: response,
              accessLabel: this.selectedAccessLevel.accessLabel
            });
          } else {
            // That's bad
          }
        });
    }
  }
}
