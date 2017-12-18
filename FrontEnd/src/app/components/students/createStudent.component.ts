import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgClass} from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";

import {StudentModel} from "./studentModel";

import {StudentService} from "../../services/students.service";
import {Student} from "../../interfaces";


@Component({
  selector: 'create-student',
  styles:[`
      .ng-valid[required], .ng-valid.required  {
        border-color: #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        color: #a94442; /* red */
      }
      .student>span+span{
        border-left:1px solid #ccc;
      }
      .student:nth-child(odd){
        background:#F5F5F5;
      }
      .fa-close:before{
        cursor:pointer;
      }
      .student .fa-close{
        vertical-align:middle;
        line-height:24px;
      }
    `],
  templateUrl: "./createStudent.template.html"
})

export class CreateStudents {
  @ViewChild("studentName", {read: ElementRef}) studentName: ElementRef;
  public studentData:StudentModel;
  public students:Student[]=[];
  public invalidEmail:boolean = false;
  constructor(
    private studentService:StudentService
  ){
    this.studentData = new StudentModel("", "");
  }
  checkStudentEmail():void{
    this.studentService.checkStudentEmail(this.studentData.email)
      .subscribe((response)=>{
        this.invalidEmail = !!response.response;
      });
  }
  removeStudent(name:string):void{
    let i:number = 0;
    for(let i:number =0; i<this.students.length; i++){
      if(this.students[i].name === name){
        this.students.splice(i, 1);
        return;
      }
    }
  }
  addStudent():void{
    if(this.studentData.name && this.studentData.email){
      this.students.push({
        name:this.studentData.name,
        email:this.studentData.email
      });
      this.studentData = new StudentModel("","");
      //Reset the input form so that multiple students can be added quickly
      this.studentName.nativeElement.focus();
    }
  }
  createStudents(){
    this.studentService.createStudents(this.students)
      .subscribe((response) =>{
        if(!!response.token){
          //Had to log in again, token expired
          this.createStudents();
        }
        else if(!!response.students){
          //Students Created
          //Send the student list to the parent handler
        }
        else{
          //Failure
        }
      })
  }
}
