import { Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {StudentService} from "../../services/students.service";
import {Student} from "../../interfaces";


@Component({
  selector: 'students-view',
  styles:[`
    .student-container{
        width:100%;
        margin-bottom:10px;
    }

    .student-item{
      font-size:20px;
    }

    .close-icon{
      cursor:pointer;
    }
  `],
  template: `
  <div class="student-container">
    <div class="no-students" *ngIf="students.length===0">Use the Search bar below to add students</div>
    <ul *ngIf="students.length>0" class="col  list-group">
      <li *ngFor="let student of students" class="student-item list-group-item d-flex justify-content-between align-items-center">
        {{student.name}}
        <div class="badge close-icon btn btn-danger" (click)="removeStudent(student.ID)"><i class="fa fa-close"></i></div>
      </li>
    </ul>
  </div>
  <add-student (addStudent)="addStudent($event)"></add-student>
  `
})

export class StudentsView implements OnInit{
  public students:Student[]=[];
  constructor(
    private studentService:StudentService
  ){
  }

  ngOnInit(): void {
    //FUTURE:: Get Students for a class


    //Setup the handler for adding students to the classes array
  }

  removeStudent(id:number):void{
    this.students = this.students.filter(student => student.ID !== id);
  }

  addStudent(student:Student){
    let unique = this.students.every(function(studentItem){
      return studentItem.ID !== student.ID;
    });
    if(unique){
      this.students.push(student);
    }
  }

  enrollStudents():void{
    //Enrolls students in the current class
  }
}
