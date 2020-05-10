import { Component, OnInit } from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

import {ClassesService} from "../services/classes.service";
import {Class} from "../interfaces";
import * as helpers from "../utilities/helpers";

@Component({
  selector: 'dashboard',
  styles:[`
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
  public classes:Class[] = [];
  constructor(
    private ClassService:ClassesService,
    private router:Router
  ){}

  ngOnInit(){
    this.getClasses();
  }

  getClasses():void{
    this.ClassService.getClasses().subscribe((response)=>{
      if(response.token){
        this.getClasses();
      }
      else{
        this.classes=response.classes;
      }
    });
  }
  
  //Open the Class for the provided ID
  openClass(classId:number):void{
    this.router.navigate(["/class/"+classId]);
  }

  getGradeColoration(average:number):string{
    if(average < 75){
      return "bg-danger";
    }
    else if(average < 80){
      return "bg-warning";
    }
    else if(average < 90){
      return "bg-secondary";
    }
    else{
      return "bg-success";
    }
  }
}
