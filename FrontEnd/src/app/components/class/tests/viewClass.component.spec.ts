import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";

// Imports for dependencies
import { Router, ActivatedRoute } from "@angular/router";
import { ViewClass } from '../ViewClass.component';
import { ClassesService } from "../../../services/classes.service";

// Import Test info
import { ClassesServiceStub } from "./classes.data";

describe('ViewClassComponent (external template)', () => {
  // //Default Test data
  // //
  let comp: ViewClass;
  let fixture: ComponentFixture<ViewClass>;
  let classService: any;
  let classHeader: DebugElement;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ViewClass], // declare the test component
      // import dependency modules
      imports: [],
      providers: [
        { provide: ClassesService, useClass: ClassesServiceStub },
        {
          provide: Router,
          useValue: {
            navigate(url: string) { return url; }
          }
        }, { provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: (key: string) => {
                switch (key) {
                  case 'id':
                    return 2;
                }
              }
            }
          }
        }
      }]
    })
      .compileComponents();
  });
  // //
  // // // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClass);

    comp = fixture.componentInstance; // BannerComponent test instance
    classService = TestBed.get(ClassesService);
    comp.getClassDetails(1);
    fixture.detectChanges();

    //
    classHeader = fixture.debugElement.query(By.css(".class-header"));
  });
  //
  it('Check that no class data message is shown', () => {
    comp.getClassDetails(-1);
    fixture.detectChanges();
    const noDataMessage = fixture.debugElement.query(By.css(".no-data-found"));
    expect(noDataMessage).toBeDefined();
  });
  //
  it('Header Displays Title and Icon', () => {
    expect(classHeader).toBeDefined();
    const titleContainer = classHeader.query(By.css(".class-title"));
    const classIcon = classHeader.query(By.css(".icon-class"));
    const classDate = classHeader.query(By.css(".class-date"));
    expect(titleContainer).toBeDefined();
    expect(classIcon).toBeDefined();
    expect(classDate).toBeDefined();
  });
  //
  // it('Verify class inputs exist', () =>{
  //   let requiredInputs = ["classTitle", "classIcon", "startDate", "endDate"];
  //   requiredInputs.forEach((input)=>{
  //     let currInput:DebugElement = de.query(By.css('[name="'+input+'"]'));
  //     expect(currInput.nativeElement).toBeDefined();
  //   });
  // });
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
