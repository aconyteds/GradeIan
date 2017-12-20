import { Component, OnInit } from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

import {ClassesService} from "../services/classes.service";
import {Class} from "../interfaces";
import * as helpers from "../utilities/helpers";

@Component({
  selector: 'dashboard',
  styles:[`
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
}
