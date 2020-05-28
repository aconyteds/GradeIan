import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { CreateStudents } from '../createStudent.component';
import { StudentService } from "../../../services/students.service";

// Import Test info
import { StudentServiceStub, StudentClass } from "./students.data";

describe('Create Students Component (external template)', () => {
  // Default Test data
  const testData: StudentClass[] = [];
  //
  let comp: CreateStudents;
  let fixture: ComponentFixture<CreateStudents>;
  let form: DebugElement;
  let table: DebugElement;
  let studentService: any;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateStudents], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        { provide: StudentService, useClass: StudentServiceStub }
      ]
    })
      .compileComponents();
  });
  //
  // // synchronous beforeEach
  beforeEach(() => {
    // Reset our test data
    fixture = TestBed.createComponent(CreateStudents);

    comp = fixture.componentInstance; // BannerComponent test instance
    studentService = TestBed.get(StudentService);

    // query for the title <h1> by CSS element selector
    form = fixture.debugElement.query(By.css('form'));
    table = fixture.debugElement.query(By.css('.student-container'));
    comp.students = [];
  });

  it('Check Component has required attributes', () => {
    expect(form.query(By.css('[name="name"]')).nativeElement.required).toBeTruthy();
    expect(form.query(By.css('[name="email"]')).nativeElement.required).toBeTruthy();
  });

  //
  it('Verify student inputs exist', () => {
    const requiredInputs = ["name", "email"];
    requiredInputs.forEach((input) => {
      const currInput: DebugElement = form.query(By.css('[name="' + input + '"]'));
      expect(currInput.nativeElement).toBeDefined();
    });
  });

  it("Place to list students", () => {
    expect(table.nativeElement).toBeDefined();
    expect(table.query(By.css(".student"))).toBeNull();
    // Add a student to the list
    comp.students.push({
      name: "bill Snith",
      email: "mail@mail"
    });
    fixture.detectChanges();
    // Verify the student is there
    expect(table.query(By.css(".student")).nativeElement).toBeDefined();
  });

  it("Able to add Student to list", () => {
    // Setup the test strings
    const name = "John Doe";
    const email = "mail@mail";
    // set the inputs to hold values
    comp.studentData.name = name;
    comp.studentData.email = email;
    // Update the form with changes
    fixture.detectChanges();
    // Click the add student button
    click(fixture.debugElement.query(By.css('#addStudentButton')));
    fixture.detectChanges();
    // See if the student was added to the list
    expect(comp.students[0].name).toMatch(name);
    expect(comp.students[0].email).toMatch(email);
  });

  it("Click to Remove Student", () => {
    // Add a student to the list
    comp.students.push({
      name: "bill Snith",
      email: "mail@mail"
    });

    fixture.detectChanges();

    // Find the close Button so we can click it
    click(table.query(By.css(".fa-close")));
    expect(comp.students.length).toEqual(0);
  });

  it("Not able to add duplicate Emails", () => {
    // Add a student to the student service
    studentService.createStudents([{
      name: "bill Snith",
      email: "mail@mail"
    }]);

    // Set the email to the already stored email
    comp.studentData.email = "mail@mail";
    // Get Our element
    const emailInput: DebugElement = form.query(By.css("#studentEmail"));
    const el = emailInput.nativeElement;
    // el.value = "mail@mail";
    // el.dispatchEvent(new Event('input'));

    // Fire the change event on the email to see if it works properly
    fixture.detectChanges();
    el.dispatchEvent(new Event("keyup"));
    // Need to wait until the observable is completed to check the value
    fixture.whenStable().then(() => {
      expect(comp.invalidEmail).toBeTruthy();
    });
  });

  it("Form creates students and resets properly", () => {
    // Send some dummy
    comp.students = [{
      name: "jimmy",
      email: "jimmy@DD.com"
    }, {
      name: "bimmy",
      email: "bimmy@DD.com"
    }];
    // Get the create student button and click it
    const createButton: DebugElement = fixture.debugElement.query(By.css("#createStudentButton"));
    click(createButton);
    // Make sure the students were added to the list properly
    expect(studentService.testData.length).toBeGreaterThan(1);
    // Wait for the async process to complete
    fixture.whenStable().then(() => {
      // Check that the form submitted properly
      expect(comp.students.length).toBe(0);
      expect(comp.studentData.name).toEqual("");
      expect(comp.studentData.email).toEqual("");
    });
  });

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

  //
  // // it("Check submit Disabled correctly", () =>{
  // //   fixture.detectChanges();
  // //   let submitButton:DebugElement = de.query(By.css('button'));
  // //   console.log(submitButton.properties);
  // //   expect(submitButton.properties.disabled).toBeTruthy();
  // // });
  //
  // it("Check Submit Enables Properly", ()=>{
  //   de.query(By.css('[name="firstName"]')).nativeElement.value = "Jimmy";
  //   de.query(By.css('[name="lastName"]')).nativeElement.value = "John";
  //   de.query(By.css('[name="email"]')).nativeElement.value = "jimmy@mail";
  //   de.query(By.css('[name="userName"]')).nativeElement.value = "jimmy369";
  //   de.query(By.css('[name="securityAnswer"]')).nativeElement.value = "answer";
  //   de.query(By.css('[name="password"]')).nativeElement.value = "CorrectPa$$w0rd1";
  //   de.query(By.css('[name="confirmPW"]')).nativeElement.value = "CorrectPa$$w0rd1";
  //   let submitButton:DebugElement = de.query(By.css('button'));
  //   expect(submitButton.properties.disabled).toBeFalsy();
  // });

});
