import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";

// Imports for dependencies
import { ClassGrades } from '../classGrades.component';
import { ClassesService } from "../../../services/classes.service";

// Import Test info
import { ClassesServiceStub } from "./classes.data";

describe('Class Grades Component (external template)', () => {
  // //Default Test data
  // //
  let comp: ClassGrades;
  let fixture: ComponentFixture<ClassGrades>;
  let classService: any;
  let gradeGrid: DebugElement;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ClassGrades], // declare the test component
      // import dependency modules
      imports: [],
      providers: [
        { provide: ClassesService, useClass: ClassesServiceStub }
      ]
    })
      .compileComponents();
  });
  // //
  // // // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ClassGrades);

    comp = fixture.componentInstance; // BannerComponent test instance
    comp.roster = [
      {ID: 1, name: "john Doe", email: "jd@mail.com"},
      {ID: 2, name: "jane doe", email: "jade@mail.com"},
      {ID: 3, name: "bimmy", email: "bimmy@mail.com"}
    ];
    comp.assignments = [
      {ID: 0, label: "Assignment 1", weight: 30, questions: 10, assignmentId: 0},
      {ID: 1, label: "Assignment 2", weight: 30, questions: 15, assignmentId: 0},
      {ID: 2, label: "Assignment 3", weight: 30, questions: 20, assignmentId: 0},
      {ID: 3, label: "Homework 1", weight: 100, questions: 10, assignmentId: 1},
      {ID: 4, label: "Quiz 1", weight: 50, questions: 10, assignmentId: 2},
      {ID: 5, label: "Quiz 2", weight: 50, questions: 15, assignmentId: 2},
      {ID: 6, label: "Test 1", weight: 100, questions: 50, assignmentId: 3}
    ];
    classService = TestBed.get(ClassesService);

    //
    gradeGrid = fixture.debugElement.query(By.css(".grade-grid"));
  });
  //
  afterEach(() => {
    fixture.destroy();
    comp = null;
  });
  //
  it('Verify grades are properly populated', () => {
    fixture.detectChanges();
    const gradeInputs = gradeGrid.queryAll(By.css("input[type='number']"));
    expect(gradeInputs.length).toEqual(comp.allGrades.length);
  });
  //
  it('Verify Edit Modes are available', () => {
    const editButtons = comp.editModes;
    editButtons.forEach((input) => {
      const currInput: DebugElement = fixture.debugElement.query(By.css('#edit_mode_' + input));
      expect(currInput.nativeElement).toBeDefined();
    });
  });
  //
  // it("Ensure there are icons for the user to click", ()=>{
  //   expect(comp.icons.length).toBeGreaterThan(0);
  //   let container:DebugElement = de.query(By.css(".icon-container"));
  //   fixture.detectChanges();
  //   comp.icons.forEach((icon) =>{
  //     let iconInput:DebugElement = container.query(By.css("."+icon));
  //     expect(iconInput.nativeElement).toBeDefined();
  //   });
  // });
  //
  // it("Select an Icon", ()=>{
  //   comp.selectIcon(comp.icons[1]);
  //   fixture.detectChanges();
  //   let input:DebugElement = de.query(By.css(".icon-container ."+comp.icons[1]));
  //   expect(input.nativeElement.className).toContain("selected");
  //   expect(comp.classData.classIcon).toEqual(comp.icons[1]);
  // });
  //
  // it("#now should return a proper date string", ()=>{
  //   let dateString = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  //   expect(dateString.test(comp.now())).toBeTruthy();
  //
  // });
  //
  // it("Create a Class", ()=>{
  //   comp.classData.classTitle = "Bio 101";
  //   comp.classData.classIcon = "fa-book";
  //   comp.classData.startDate = comp.now();
  //   comp.classData.endDate = comp.now();
  //   fixture.detectChanges();
  //   comp.createClass();
  //   fixture.detectChanges();
  //   expect(classService.classCreated).toBeGreaterThan(0);
  // });
  //
  // it("Verify submit button is working", ()=>{
  //   let submitButton:DebugElement = fixture.debugElement.query(By.css("button[type='submit']"));
  //   click(submitButton);
  //   expect(classService.classCreated).toEqual(1);
  //   comp.classData.classTitle = "Bio 101";
  //   comp.classData.classIcon = "fa-book";
  //   comp.classData.startDate = comp.now();
  //   comp.classData.endDate = comp.now();
  //   fixture.detectChanges();
  //   click(submitButton);
  //   fixture.detectChanges();
  //   expect(classService.classCreated).toBeGreaterThan(0);
  // });

});
