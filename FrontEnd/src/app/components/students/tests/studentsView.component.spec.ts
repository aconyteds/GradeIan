import { ComponentFixture, TestBed, async, tick, fakeAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";
import { of } from 'rxjs';

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { StudentsView } from '../studentsView.component';
import { AddStudent } from '../addStudent.component';
import { StudentService } from "../../../services/students.service";

// Import Test info
import { StudentServiceStub, StudentClass } from "./students.data";

describe('Students View Component', () => {
  // Default Test data
  const testData: StudentClass[] = [
    { ID: 1, name: "john Doe", email: "jd@mail.com" },
    { ID: 2, name: "jane doe", email: "jade@mail.com" },
    { ID: 3, name: "bimmy", email: "bimmy@mail.com" }
  ];
  //
  let comp: StudentsView;
  let fixture: ComponentFixture<StudentsView>;
  let studentService: any;
  let el: DebugElement;
  //
  // // synchronous beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsView, AddStudent], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        { provide: StudentService, useClass: StudentServiceStub }
      ]
    });
    // Reset our test data
    fixture = TestBed.createComponent(StudentsView);

    comp = fixture.componentInstance; // BannerComponent test instance
    studentService = TestBed.get(StudentService);
    studentService.testData = testData;

    el = fixture.debugElement.query(By.css(".student-container"));
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it("Students added to interface properly", () => {
    comp.students = testData;
    fixture.detectChanges();

    const items = el.queryAll(By.css(".student-item"));
    expect(items.length).toEqual(testData.length);
  });

  it("Able to remove student from list", () => {
    comp.students = testData;
    const originalLength = testData.length;
    fixture.detectChanges();

    const item = el.query(By.css(".close-icon"));
    item.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(el.queryAll(By.css(".student-item")).length).toBeLessThan(originalLength);
  });

  it("Student list updates properly based on the number of students", () => {
    comp.students = [];
    fixture.detectChanges();
    let items = el.queryAll(By.css(".no-students"));
    expect(items.length).toEqual(1);

    comp.students = testData;
    fixture.detectChanges();
    items = el.queryAll(By.css(".student-item"));
    expect(items.length).toEqual(testData.length);

    comp.students = [];
    fixture.detectChanges();
    items = el.queryAll(By.css(".no-students"));

    expect(items.length).toEqual(1);
  });

  it("Able to enroll students", () => {
    comp.addStudent(testData[0]);
    fixture.detectChanges();

    comp.updateStudents(0);
    expect(studentService.enrolledStudents.length).toEqual(1);
  });

  it("Able to withdraw students", () => {
    comp.students = testData;
    comp.ngOnInit();
    fixture.detectChanges();

    const items = el.queryAll(By.css(".close-icon"));
    items[0].triggerEventHandler("click", null);
    fixture.detectChanges();

    comp.updateStudents(0);
    expect(studentService.withdrawnStudents.length).toEqual(1);
  });

});
