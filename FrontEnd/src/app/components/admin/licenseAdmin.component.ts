import { Component, OnInit } from '@angular/core';
import { AdminService } from "./admin.service";
import { UserGroupModel, GroupLicenseDetailsModel } from "./admin.models";

@Component({
  selector: 'app-license-admin',
  templateUrl: "./licenseAdmin.template.html",
  styles: [`
    .selected{
      font-weight:bold;
    }

    .force-select {
      -webkit-user-select: all;  /* Chrome 49+ */
      -moz-user-select: all;     /* Firefox 43+ */
      -ms-user-select: all;      /* No support yet */
      user-select: all;          /* Likely future */
    }
  `]
})

export class LicenseAdminComponenet implements OnInit {
  public userGroups: UserGroupModel[] = [];
  public showingGroups: UserGroupModel[] = [];
  public selectedGroupLicenseDetails: GroupLicenseDetailsModel[] = [];
  public selectedView = "table";
  public filterString = "";
  public groupId: number;
  public isSiteAdmin = false;
  constructor(
    private adminService: AdminService
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
  }

  private checkYourPrivelege() {
    this.adminService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isSiteAdmin = response.siteAdmin === "1";
        this.getGroupsDetails();
      } else {
        this.isSiteAdmin = false;
      }
    });
  }

  public getGroupsDetails() {
    this.adminService.getGroupsDetails().subscribe((response) => {
      if (response && response.length > 0) {
        this.userGroups = response.map((userGroup: any) => {
          return new UserGroupModel(
            parseInt(userGroup.GroupID, 10),
            userGroup.GroupName,
            parseInt(userGroup.userCount, 10),
            parseInt(userGroup.studentCount, 10),
            parseInt(userGroup.licenseCount, 10)
          );
        });
        this.filterUserGroups("");
      }
    });
  }

  public selectGroup(groupId: number) {
    if (groupId !== this.groupId) {
      this.groupId = groupId;
      this.adminService.getGroupLicenseDetails(this.groupId).subscribe((response) => {
        if (response !== "0" && response.length > 0) {
          this.selectedGroupLicenseDetails = response.map((licenseDetails: any) => {
            return new GroupLicenseDetailsModel(
              licenseDetails.licenseLabel,
              licenseDetails.licenseString,
              licenseDetails.userName,
              licenseDetails.email
            );
          });
        } else {
          this.selectedGroupLicenseDetails = [];
        }
      });
    }
  }

  public getUserGroupName(groupId: number) {
    let groupName = "";
    this.userGroups.some((group: UserGroupModel) => {
      if (group.groupId === groupId) {
        groupName = group.groupName;
        return true;
      }
    });

    return groupName;
  }

  public filterUserGroups(filterString: string) {
    this.filterString = filterString;
    if (this.filterString !== "") {
      this.showingGroups = this.userGroups.filter((user: UserGroupModel) => {
        return user.groupName.toString().toLowerCase().search(this.filterString.toLowerCase()) !== -1;
      });
    } else {
      this.showingGroups = this.userGroups;
    }
  }

  public handleNewGroupResponse(newGroupDetails: UserGroupModel) {
    if (newGroupDetails.groupId !== 0 ) {
      newGroupDetails.licenseCount = 0;
      newGroupDetails.studentCount = 0;
      newGroupDetails.userCount = 0;
      this.userGroups.push(newGroupDetails);
      this.filterUserGroups(this.filterString);
    }
  }

  public handleNewLicense(newLicense: any) {
    this.userGroups.some((group: UserGroupModel) => {
      if (group.groupId === newLicense.groupId) {
        group.licenseCount ++;
        return true;
      }
    });
    this.filterUserGroups(this.filterString);
    this.selectedGroupLicenseDetails.push(
      new GroupLicenseDetailsModel(
        newLicense.accessLabel,
        newLicense.license,
        "",
        ""
      )
    );
  }
}
