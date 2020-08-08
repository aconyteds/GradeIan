import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GroupsService } from "./groups.service";
import { GroupStudentModel } from "./groups.models";

@Component({
  selector: 'app-admin-groups-students',
  templateUrl: "./viewStudents.template.html",
  styles: [`
  `]
})

export class ViewStudentsComponent implements OnInit {
  public groupStudents: GroupStudentModel[] = [];
  public showingStudents: GroupStudentModel[] = [];
  private searchableFields = ["name", "email"];
  public filterString = "";
  public groupId!: number;
  public isAdmin = false;
  public isSiteAdmin = false;
  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
    this.getGroupStudents();
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

  private getGroupStudents() {
    this.groupsService.getGroupStudents(this.groupId).subscribe((response: any) => {
      if (response !== "0") {
        this.groupStudents = response.map((groupStudent: any) => {
          const active = groupStudent.isActive === "1";
          return new GroupStudentModel(
            parseInt(groupStudent.ID, 10),
            groupStudent.name,
            active,
            groupStudent.email
          );
        });
        this.filterStudents("");
      }
    });
  }

  public toggleActive(student: GroupStudentModel) {
    this.groupsService.setStudentStatus(student.studentID, !student.active).subscribe((response: any) => {
      if (response !== "0") {
        student.active = !student.active;
      }
    });
  }

  public selectGroup(groupId: number) {
    if (groupId !== this.groupId) {
      this.groupId = groupId;
      this.getGroupStudents();
    }
  }

  public addStudentHandler(newStudents: any[]) {
    const formattedStudents = newStudents.map((newStudent: any) => {
      return new GroupStudentModel(
        parseInt(newStudent.ID, 10),
        newStudent.name,
        true,
        newStudent.email
      );
    });

    this.groupStudents = this.groupStudents.concat(formattedStudents);
  }

  public filterStudents(filterString: string) {
    this.filterString = filterString;
    if (this.filterString !== "") {
      this.showingStudents = this.groupStudents.filter((student: GroupStudentModel) => {
        return this.searchableFields.some((field: string) =>
        student[field] && student[field].toString().toLowerCase().search(this.filterString.toLowerCase()) !== -1);
      });
    } else {
      this.showingStudents = this.groupStudents;
    }
  }
}
