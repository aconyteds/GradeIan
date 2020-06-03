import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../test/utilities";

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserDashboard } from '../dashboard.component';
import { ClassesService } from "../../services/classes.service";
import { Class } from "../../interfaces";

// Import Test info
import { ClassesServiceStub } from "../class/tests/classes.data";

describe('User Dashboard (external template)', () => {
  // Default Test data
  const testData: Class[] = [{
    teacherId: 1,
    classTitle: "Bio 101",
    classIcon: "fa fa-book",
    startDate: new Date( new Date().getMilliseconds() - 20000).toDateString(),
    endDate: new Date( new Date().getMilliseconds() + 20000).toDateString(),
    students: 20,
    classAverage: 90,
    classProgress: 20
  }, {
    teacherId: 1,
    classTitle: "Anatomy 101",
    classIcon: "fa fa-check",
    startDate: new Date( new Date().getMilliseconds() - 20000).toDateString(),
    endDate: new Date( new Date().getMilliseconds() + 20000).toDateString(),
    students: 15,
    classAverage: 85,
    classProgress: 35
  }];
  //
  let comp: UserDashboard;
  let fixture: ComponentFixture<UserDashboard>;
  let cc: DebugElement;
  let classService: any;
  let router: any;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UserDashboard], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        { provide: ClassesService, useClass: ClassesServiceStub },
        {
          provide: Router,
          useValue: {
            lastClicked: "",
            navigate(urls: string[]) { this.lastClicked = urls[0]; }
          }
        }]
    })
      .compileComponents();
  });
  //
  // // synchronous beforeEach
  beforeEach(() => {
    // Reset our test data
    classService = TestBed.get(ClassesService);
    testData.forEach((classData) => {
      classService.createClass(classData);
    });
    router = TestBed.get(Router);

    // Create the Component
    fixture = TestBed.createComponent(UserDashboard);
    comp = fixture.componentInstance; // UserDashboard test instance
    comp.changeClassVisibility("all"); // Needs to show all data

    // query for the title <h1> by CSS element selector
    cc = fixture.debugElement.query(By.css('.class-container'));
  });

  it("Classes added appropriately", (done: any) => {
    comp.getClasses();

    fixture.whenStable().then(() => {
      expect(comp.allClasses.length).toEqual(2);
      fixture.detectChanges();
      const classElement: DebugElement = cc.query(By.css('.class-item'));
      expect(classElement.nativeElement).toBeDefined();
      done();
    });
  });

  it("Classes show all properties properly", (done: any) => {
    comp.getClasses();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const classElement: DebugElement = cc.query(By.css('.class-item'));
      expect(classElement.query(By.css(".class-title")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-icon")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".student-count")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-average")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-progress")).nativeElement).toBeDefined();
      done();
    });
  });

  it("Clicking on a Class Navigates properly", (done: any) => {
    comp.getClasses();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const classElement: DebugElement = cc.query(By.css('.class-item'));
      click(classElement);
      expect(router.lastClicked).toMatch("/class/1");
      done();
    });
  });

  it("Able to navigate to create class", () => {
    const createClassButton: DebugElement = fixture.debugElement.query(By.css("button.btn"));

    expect(createClassButton.nativeElement).toBeDefined();
    expect(createClassButton.attributes.routerLink).toMatch("/newClass");
  });

  it("Color coding for grades returning correctly", () => {
    expect(comp.getGradeColoration(50)).toContain("danger");
    expect(comp.getGradeColoration(75)).toContain("warning");
    expect(comp.getGradeColoration(83)).toContain("secondary");
    expect(comp.getGradeColoration(100)).toContain("success");
  });
});
