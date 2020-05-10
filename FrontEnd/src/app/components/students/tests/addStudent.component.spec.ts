import { ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {click} from "../../../test/utilities";

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { AddStudent } from '../addStudent.component';
import { StudentService } from "../../../services/students.service";

// Import Test info
import {StudentServiceStub, StudentClass} from "./students.data";

describe('Add Students Component', () => {
  // Default Test data
  const testData: StudentClass[] = [
    {ID: 1, name: "john Doe", email: "jd@mail.com"},
    {ID: 2, name: "jane doe", email: "jade@mail.com"},
    {ID: 3, name: "bimmy", email: "bimmy@mail.com"}
  ];
  //
  let comp: AddStudent;
  let fixture: ComponentFixture<AddStudent>;
  let form: DebugElement;
  let studentService: any;
  //
  // // synchronous beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudent ], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        {provide: StudentService, useClass: StudentServiceStub}
      ]
    });
    // Reset our test data
    fixture = TestBed.createComponent(AddStudent);

    comp = fixture.componentInstance; // BannerComponent test instance
    studentService = TestBed.get(StudentService);
    studentService.testData = testData;

    // query for the title <h1> by CSS element selector
    form = fixture.debugElement.query(By.css('form'));
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it("Users can input search terms", () => {
    expect(form.query(By.css("input[name='searchTerm']")).nativeElement).toBeDefined();
  });

  // it("Make sure there are input for all properties of a student", ()=>{
  //   expect(form.query(By.css("input[name='name']")).nativeElement).toBeDefined();
  //   expect(form.query(By.css("input[name='email']")).nativeElement).toBeDefined();
  //   expect(form.query(By.css("input[name='ID']")).nativeElement).toBeDefined();
  // });

  it("Inputting a search term sends the string to the correct place", ((done: any) => {
    comp.searchTerm.subscribe((term: string) => {
      expect(term).toMatch("joh");
      done();
    });
    const input: DebugElement = form.query(By.css("input[name='searchTerm']"));
    input.nativeElement.value = "joh";
    input.nativeElement.dispatchEvent(new Event("keyup"));
  }));

  it("Students are populated Properly when inputting a search term", fakeAsync(() => {
    const input: DebugElement = form.query(By.css("input[name='searchTerm']"));
    input.nativeElement.value = "joh";
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event("keyup"));
    tick(300);
    expect(comp.searchResultCount).toEqual(1);

    input.nativeElement.value = "ja";
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event("keyup"));
    tick(300);
    expect(comp.searchResultCount).toEqual(1);

    input.nativeElement.value = "mail";
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event("keyup"));
    tick(300);
    fixture.detectChanges();
    expect(comp.searchResultCount).toEqual(testData.length);

    const searchItems: DebugElement[] = form.queryAll(By.css("li.search-item"));
    expect(searchItems.length).toEqual(comp.searchResultCount);
    input.nativeElement.value = "spongebobsquarepants";
    input.nativeElement.dispatchEvent(new Event("keyup"));
    fixture.detectChanges();
    tick(300);
    expect(comp.searchResultCount).toEqual(0);
  }));

  it("Clicking a search item adds a student", fakeAsync(() => {
    spyOn(comp.addStudent, 'emit');

    const input: DebugElement = form.query(By.css("input[name='searchTerm']"));
    input.nativeElement.value = "mail";
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event("keyup"));
    tick(300);
    fixture.detectChanges();
    const searchItems: DebugElement[] = form.queryAll(By.css("li.search-item"));
    click(searchItems[0].nativeElement);
    expect(comp.addStudent.emit).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it("Pressing enter on a search-item adds a student", fakeAsync(() => {
    spyOn(comp.addStudent, 'emit');

    const input: DebugElement = form.query(By.css("input[name='searchTerm']"));
    input.nativeElement.value = "mail";
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event("keyup"));
    tick(300);
    fixture.detectChanges();
    const searchItems: DebugElement[] = form.queryAll(By.css("li.search-item"));
    searchItems[0].nativeElement.dispatchEvent(new KeyboardEvent("keydown", {
        "key": "Enter"
    }));
    expect(comp.addStudent.emit).toHaveBeenCalled();
    fixture.detectChanges();
    expect(input.nativeElement.value).toMatch("");
    discardPeriodicTasks();
  }));

});
