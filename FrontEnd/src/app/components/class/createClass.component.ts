import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";
import {Router} from "@angular/router";

import {ClassModel} from "./classModel";
import {classIcons} from "../../config";

import {ClassesService} from "../../services/classes.service";
import {Class} from "../../interfaces";

@Component({
  selector: 'create-class',
  styles:[`
      .ng-valid[required], .ng-valid.required  {
        border-left: 5px solid #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        border-left: 5px solid #a94442; /* red */
      }
      .icon-container > span.fa{
        margin:2px;
        padding:5px;
        cursor:pointer;
        height: 28px;
        width: 28px;
        vertical-align: middle;
        text-align: center;
      }
      .icon-container > span.fa.selected{
        border:1px solid;
        padding:4px;
      }
    `],
  templateUrl: "./createClass.template.html"
})

export class CreateClass {
  public classData:ClassModel;
  public icons:string[]=classIcons;
  constructor(
    private ClassService:ClassesService
  ){
    this.classData = new ClassModel("", this.icons[0], this.now(), this.now(), window.sessionStorage.getItem("token"));
  }
  now():string{
    var now = new Date(),
      month = (now.getMonth()+1).toString(),
      day = (now.getDate()).toString();
    month = month.length == 2?month:"0"+month;
    day = day.length == 2?day:"0"+day;
    return now.getFullYear() +"-"+month+"-"+day;
  }
  selectIcon(iconClass:string){
    this.classData.classIcon = iconClass;
  }
  createClass(){
    this.ClassService.createClass(this.classData)
      .subscribe((response) =>{
        if(response.token){
          //Had to log in again, token expired
          this.createClass();
        }
        else if(!!response.response){
          //Class Created
        }
        else{
          //Failure
        }
      })
  }
}
