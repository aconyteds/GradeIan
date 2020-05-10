import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {click} from "../../../test/utilities";

//Imports for dependencies
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { ViewClass } from '../ViewClass.component';
import { ClassesService } from "../../../services/classes.service";
import {Class} from "../../../interfaces";

//Import Test info
import {ClassesServiceStub} from "./classes.data";

describe('ViewClassComponent (external template)', () => {
  // //Default Test data
  // let testData:Class[];
  // //
  // let comp: CreateClass;
  // let fixture: ComponentFixture<CreateClass>;
  // let de: DebugElement;
  // let classService:any;
  // //
  // beforeEach(async() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ CreateClass ], // declare the test component
  //     //import dependency modules
  //     imports:[FormsModule],
  //     providers:[
  //       {provide:ClassesService, useClass:ClassesServiceStub},
  //       {
  //         provide:Router,
  //         useValue:{
  //           navigate(url:string){return url;}
  //         }
  //       }]
  //   })
  //   .compileComponents();
  // });
  // //
  // // // synchronous beforeEach
  // beforeEach(() => {
  //   //Reset our test data
  //   fixture = TestBed.createComponent(CreateClass);
  //
  //   comp = fixture.componentInstance; // BannerComponent test instance
  //   classService = TestBed.get(ClassesService);
  //
  //   // query for the title <h1> by CSS element selector
  //   de = fixture.debugElement.query(By.css('form'));
  // });
  //
  // it('Check Component has required attributes', () => {
  //   expect(de.query(By.css('[name="classTitle"]')).nativeElement.required).toBeTruthy();
  // });
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
