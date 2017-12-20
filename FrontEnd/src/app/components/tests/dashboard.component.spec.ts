import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {click} from "../../test/utilities";

//Imports for dependencies
import {Router} from "@angular/router";
import { UserDashboard } from '../dashboard.component';
import { ClassesService } from "../../services/classes.service";
import {Class} from "../../interfaces";

//Import Test info
import {ClassesServiceStub} from "../class/tests/classes.data";

describe('User Dashboard (external template)', () => {
  //Default Test data
  let testData:Class[] =[{
    teacherId:1,
    classTitle:"Bio 101",
    classIcon:"fa-book",
    startDate:new Date().toDateString(),
    endDate:new Date().toDateString(),
    students:20,
    classAverage:90,
    classProgress:20
  },{
    teacherId:1,
    classTitle:"Anatomy 101",
    classIcon:"fa-check",
    startDate:new Date().toDateString(),
    endDate:new Date().toDateString(),
    students:15,
    classAverage:85,
    classProgress:35
  }];
  //
  let comp: UserDashboard;
  let fixture: ComponentFixture<UserDashboard>;
  let cc: DebugElement;
  let classService:any;
  let router:any;
  //
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboard ], // declare the test component
      //import dependency modules
      imports:[],
      providers:[
        {provide:ClassesService, useClass:ClassesServiceStub},
        {
          provide:Router,
          useValue:{
            lastClicked:"",
            navigate(urls:string[]){this.lastClicked=urls[0];}
          }
        }]
    })
    .compileComponents();
  });
  //
  // // synchronous beforeEach
  beforeEach(() => {
    //Reset our test data
    fixture = TestBed.createComponent(UserDashboard);

    comp = fixture.componentInstance; // UserDashboard test instance
    classService = TestBed.get(ClassesService);
    testData.forEach((classData)=>{
      classService.createClass(classData);
    });
    router = TestBed.get(Router);

    // query for the title <h1> by CSS element selector
    cc = fixture.debugElement.query(By.css('.class-container'));
  });

  it("Classes added appropriately", ()=>{
    comp.getClasses();

    fixture.whenStable().then(()=>{
      expect(comp.classes.length).toEqual(2);
      fixture.detectChanges();
      let classElement:DebugElement = cc.query(By.css('.class-item'));
      expect(classElement.nativeElement).toBeDefined();
    });
  });

  it("Classes show all properties properly", ()=>{
    comp.getClasses();

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      let classElement:DebugElement = cc.query(By.css('.class-item'));
      expect(classElement.query(By.css(".class-title")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-icon")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".student-count")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-average")).nativeElement).toBeDefined();
      expect(classElement.query(By.css(".class-progress")).nativeElement).toBeDefined();
    });
  });

  it("Clicking on a Class Navigates properly", ()=>{
    comp.getClasses();

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      let classElement:DebugElement = cc.query(By.css('.class-item'));
      click(classElement);
      expect(router.lastClicked).toMatch("/class/1");
    });
  });

  it("Able to navigate to create class", ()=>{
    let createClassButton:DebugElement = fixture.debugElement.query(By.css("button.btn"));

    expect(createClassButton.nativeElement).toBeDefined();
    expect(createClassButton.attributes.routerLink).toMatch("/newClass");
  });
});
