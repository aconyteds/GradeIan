import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from "../../../test/utilities";

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { AssignmentView } from "../assignmentView.component";
import { AssignmentService } from "../../../services/assignment.service";
import { AssignmentItem, AssignmentGroup } from "../../../interfaces";

// Import Test info
import { AssignmentServieStub } from "./assignments.data";

describe('Assignment View Component (external template)', () => {
  // Default Test data
  const assignmentGroups: AssignmentGroup[] = [];
  const assignmentItems: AssignmentItem[] = [];
  //
  let comp: AssignmentView;
  let fixture: ComponentFixture<AssignmentView>;
  let assignmentContainer: DebugElement;
  let createButton: DebugElement;
  let assignmentService: any;
  //
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AssignmentView], // declare the test component
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
    fixture = TestBed.createComponent(AssignmentView);

    comp = fixture.componentInstance; // BannerComponent test instance
    assignmentService = TestBed.get(AssignmentService);

    // Setup initial helper object
    assignmentContainer = fixture.debugElement.query(By.css('.assignment-container'));
    createButton = fixture.debugElement.query(By.css('[name="createAssignmentGroupButton"]'));
  });

  //
  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it("No items visible at start", () => {
    fixture.detectChanges();
    expect(comp.assignmentData.length).toEqual(0);
    expect(assignmentContainer.query(By.css(".no-assignments")).nativeElement).toBeDefined();
  });

  it('Check Assignment Group added to list when Create Button Clicked', () => {
    click(createButton);
    fixture.detectChanges();
    expect(assignmentContainer.query(By.css(".no-assignments"))).toBeNull();
    expect(comp.assignmentData.length).toEqual(1);
    expect(assignmentContainer.queryAll(By.css(".assignment-item")).length).toEqual(comp.assignmentData.length);

    click(createButton);
    fixture.detectChanges();
    expect(assignmentContainer.queryAll(By.css(".assignment-item")).length).toEqual(comp.assignmentData.length);
  });
  //
  it('Verify Assignment Group removed from list when close button is clicked', () => {
    click(createButton);
    fixture.detectChanges();

    let assignmentItems: DebugElement[] = assignmentContainer.queryAll(By.css(".assignment-item"));
    expect(assignmentItems.length).toEqual(1);
    let closeButton = assignmentItems[0].query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(assignmentContainer.query(By.css(".no-assignments")).nativeElement).toBeDefined();
    click(createButton);
    click(createButton);
    fixture.detectChanges();

    expect(assignmentContainer.query(By.css(".no-assignments"))).toBeNull();
    assignmentItems = assignmentContainer.queryAll(By.css(".assignment-item"));
    closeButton = assignmentItems[1].query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(comp.assignmentData.length < assignmentItems.length).toBeTrue();
    expect(comp.assignmentData[0].title.search("1") !== -1).toBeTrue();
    closeButton = assignmentContainer.query(By.css(".close-icon"));
    click(closeButton);
    fixture.detectChanges();

    expect(assignmentContainer.query(By.css(".no-assignments")).nativeElement).toBeDefined();
  });
  //
  it("Verify warning for weight appears", () => {
    click(createButton);
    click(createButton);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(".weight-warning")).nativeElement).toBeDefined();

    click(assignmentContainer.query(By.css(".close-icon")));
    click(createButton);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(".weight-warning")).nativeElement.hidden).toBeTrue();
  });
});
