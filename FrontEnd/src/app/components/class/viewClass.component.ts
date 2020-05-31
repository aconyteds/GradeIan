import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router } from "@angular/router";

import { ClassesService } from "../../services/classes.service";
import { Class } from "../../interfaces";

@Component({
  selector: 'ViewClass',
  styles: [``],
  templateUrl: "./viewClass.template.html"
})

export class ViewClass {
  constructor(
    private classesService: ClassesService
  ) {
  }
}
