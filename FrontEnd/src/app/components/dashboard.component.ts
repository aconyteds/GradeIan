import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ClassesService } from "../services/classes.service";
import { Class } from "../interfaces";
import * as helpers from "../utilities/helpers";

@Component({
  selector: 'dashboard',
  styles: [`
    .class-container{
      margin-top:15px;
    }

    .class-item{
      cursor:pointer;
    }

    ul.class-data{
      list-style:none;
      padding-left:0;
    }

    ul.class-data>li span{
      border-left:1px solid #ccc;
    }

    ul.class-data>li:nth-child(odd){
      background:#FAFAFA;
    }
    `],
  templateUrl: "./dashboard.template.html"
})

export class UserDashboard implements OnInit {
  public classes: Class[] = [];
  public allClasses: Class[] = [];
  public defaultView = "current";
  public filterTypes = ["current", "past", "future", "all"];
  constructor(
    private ClassService: ClassesService,
    private router: Router
  ) { }

  public ngOnInit() {
    if (!window.localStorage.getItem("class-view")) {
      window.localStorage.setItem("class-view", this.defaultView);
    }
    this.getClasses();
  }

  public getClasses(): void {
    this.ClassService.getClasses().subscribe((response) => {
      if (helpers.validateToken(response.token)) {
        this.getClasses();
      } else if (response.classes) {
        this.allClasses = response.classes;
        this.changeClassVisibility(window.localStorage.getItem("class-view") || this.defaultView);
      }
    });
  }

  // Open the Class for the provided ID
  public openClass(classId: number): void {
    this.router.navigate(["/class/" + classId]);
  }

  public getHeaderColor(classDetails: Class): string {
    const now = new Date();
    const startDate = new Date(classDetails.startDate);
    const endDate = new Date(classDetails.endDate);

    if (endDate < now) {
      // Past
      return "bg-info";
    } else if (startDate < now && endDate > now) {
      // Current
      return "bg-primary";
    } else {
      // Future
      return "bg-secondary";
    }
  }

  public getGradeColoration(average: number): string {
    if (average < 75) {
      return "bg-danger";
    } else if (average < 80) {
      return "bg-warning";
    } else if (average < 90) {
      return "bg-secondary";
    } else {
      return "bg-success";
    }
  }

  public changeClassVisibility(value: string) {
    if (!!value) {
      window.localStorage.setItem("class-view", value);
      const now = new Date();

      this.classes = this.allClasses.filter((classItem) => {
        const startDate = new Date(classItem.startDate);
        const endDate = new Date(classItem.endDate);
        switch (value) {
          case "current":
            return startDate < now && endDate > now;
          case "future":
            return startDate > now;
          case "past":
            return endDate < now;
          case "all":
          default:
            return true;
        }
      });
    }
  }

  public getFilterButtonColor(filter: string) {
    switch (filter) {
      case "current":
        return "btn-primary";
      case "future":
        return "btn-secondary";
      case "past":
        return "btn-info";
      case "all":
      default:
        return "btn-warning";
    }
  }

  public checkView(view: string): boolean {
    return (view === window.localStorage.getItem("class-view"));
  }
}
