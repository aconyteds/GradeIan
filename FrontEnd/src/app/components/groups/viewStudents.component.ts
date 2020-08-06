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
  public selectedStudent!: GroupStudentModel;
  private groupId!: number;
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
    this.groupsService.getGroupStudents().subscribe((response: any) => {
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
      }
    });
  }

  public selectUser(selectedStudent: GroupStudentModel) {
    this.selectedStudent = selectedStudent;
  }

  public toggleActive(student: GroupStudentModel) {
    this.groupsService.setStudentStatus(student.studentID, !student.active).subscribe((response: any) => {
      if (response !== "0") {
        student.active = !student.active;
      }
    });
  }
}
