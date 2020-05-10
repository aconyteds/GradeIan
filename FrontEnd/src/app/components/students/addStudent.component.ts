import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {NgForm, PatternValidator, EmailValidator} from "@angular/forms";
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, count} from 'rxjs/operators';

import {StudentModel} from "./studentModel";

import {StudentService} from "../../services/students.service";

@Component({
  selector: "add-student",
  styles: [`
    .search-label{
    }

    .search-results{
      background-color: #FFF;
      position: absolute;
      width: 100%;
      z-index: 1;
    }

    .search-item{
      cursor:pointer;
      transition:background-color .1s;
      transition-timing-function:ease-in-out;
    }

    .search-item:hover{
      background-color:#EEE;
    }

    .email-display{
      color:#ccc;
    }
  `],
  templateUrl: "./addStudent.template.html"
})

export class AddStudent implements OnInit {
  public searchTerm = new Subject<string>();
  public searchResultCount = 0;
  @Output() public addStudent: EventEmitter<StudentModel> = new EventEmitter();
  public students$: Observable<StudentModel[]>;
  constructor(
    private studentService: StudentService
  ) {}

  public ngOnInit(): void {
    this.students$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.studentService.getStudent(term))
    );

    this.students$.subscribe((results) => {
      this.searchResultCount = results.length;
    });
  }

  public search(term: string): void {
    this.searchResultCount = 1;
    this.searchTerm.next(term);
  }

  public studentClickHandler(student: StudentModel, searchTerm: any): void {
    if (!!student) {
      // Method to add student to the student list when it is selected from the drop down menu
      this.addStudent.emit(student);
      searchTerm.value = "";
      this.search("");
    }
  }
}
