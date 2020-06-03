import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { AssignmentList } from "../assignmentList.component";
import { AssignmentService } from "../../../services/assignment.service";
import { AssignmentItem } from "../../../interfaces";

// Import Test info
import { AssignmentServieStub } from "./assignments.data";

describe('Assignment List Component (external template)', () => {
  // Default Test data
  const testData: AssignmentItem[] = [];
  //
  let comp: AssignmentList;
  let fixture: ComponentFixture<AssignmentList>;
  let assignmentList: DebugElement;
  let createButton: DebugElement;
  let assignmentService: any;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AssignmentList], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        { provide: AssignmentService, useClass: AssignmentServieStub }
      ]
    })
      .compileComponents();
  });

  // synchronous beforeEach
  beforeEach(() => {
    // Reset our test data
    fixture = TestBed.createComponent(AssignmentList);

    comp = fixture.componentInstance; // BannerComponent test instance
    assignmentService = TestBed.get(AssignmentService);

    // Setup initial helper object
    assignmentList = fixture.debugElement.query(By.css('.assignment-list'));
    createButton = fixture.debugElement.query(By.css('[name="createAssignmentItemButton"]'));
  });

  //
  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it("No items visible at start", () => {
    fixture.detectChanges();
    expect(comp.assignmentData.length).toEqual(0);
    expect(assignmentList.query(By.css(".no-assignments")).nativeElement).toBeDefined();
  });

  it('Check Assignment Item added to list when Create Button Clicked', () => {
    click(createButton);
    fixture.detectChanges();
    expect(assignmentList.query(By.css(".no-assignments"))).toBeNull();
    expect(comp.assignmentData.length).toEqual(1);
    expect(assignmentList.queryAll(By.css(".assignment-item")).length).toEqual(comp.assignmentData.length);

    click(createButton);
    fixture.detectChanges();
    expect(assignmentList.queryAll(By.css(".assignment-item")).length).toEqual(comp.assignmentData.length);
  });
  //
  it('Verify Assignment Item removed from list when close button is clicked', () => {
    click(createButton);
    fixture.detectChanges();

    let assignmentListItems: DebugElement[] = assignmentList.queryAll(By.css(".assignment-item"));
    expect(assignmentListItems.length).toEqual(1);
    let closeButton = assignmentListItems[0].query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(assignmentList.query(By.css(".no-assignments")).nativeElement).toBeDefined();
    click(createButton);
    click(createButton);
    fixture.detectChanges();

    expect(assignmentList.query(By.css(".no-assignments"))).toBeNull();
    assignmentListItems = assignmentList.queryAll(By.css(".assignment-item"));
    closeButton = assignmentListItems[1].query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(comp.assignmentData.length < assignmentListItems.length).toBeTrue();
    expect(comp.assignmentData[0].label.search("1") !== -1).toBeTrue();
    closeButton = assignmentList.query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(assignmentList.query(By.css(".no-assignments")).nativeElement).toBeDefined();
  });
  //
  it("Verify assignment weight changes color properly", () => {
    click(createButton);
    click(createButton);
    fixture.detectChanges();

    let weightDisplay: DebugElement = assignmentList.query(By.css(".weight-display"));
    expect(weightDisplay.nativeElement).toBeDefined();
    expect(weightDisplay.nativeElement.className.search("text-danger") === -1).toBeFalse();
    click(assignmentList.query(By.css(".close-icon")));
    click(createButton);
    fixture.detectChanges();

    weightDisplay = assignmentList.query(By.css(".weight-display"));
    expect(weightDisplay.nativeElement.className.search("text-success") === -1).toBeFalse();
  });
  //
  it("Verify that inputs are useable", () => {
    click(createButton);
    fixture.detectChanges();

    expect(assignmentList.query(By.css('[name="label"]')).nativeElement).toBeDefined();
    expect(assignmentList.query(By.css('[name="questions"]')).nativeElement).toBeDefined();
    expect(assignmentList.query(By.css('[name="weight"]')).nativeElement).toBeDefined();
  });
  //
});
