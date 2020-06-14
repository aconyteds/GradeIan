import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Imports for dependencies
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CreateAccount } from '../createAccount.component';
import { AccountService } from "../../../services/account.service";

// Import Test info
import { TestUser, AccountServiceStub } from "./createAccount.data";

describe('CreateAccountComponent (external template)', () => {
  // Default Test data
  // let testData: TestUser[];

  let comp: CreateAccount;
  let fixture: ComponentFixture<CreateAccount>;
  let de: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateAccount], // declare the test component
      // import dependency modules
      imports: [FormsModule],
      providers: [
        { provide: AccountService, useClass: AccountServiceStub },
        {
          provide: Router,
          useValue: {
            navigate(url: string) { return url; }
          }
        }]
    })
      .compileComponents();
  });

  // synchronous beforeEach
  beforeEach(() => {
    // Reset our test data
    fixture = TestBed.createComponent(CreateAccount);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('form'));
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
    comp = null;
  });

  it('Check Required Inputs have Required Attribute', () => {
    const requiredInputs = ["firstName", "lastName", "email", "password", "securityAnswer", "userName", "licenseKey"];
    requiredInputs.forEach((input) => {
      const currInput: DebugElement = de.query(By.css('[name="' + input + '"]'));
      expect(currInput.nativeElement.required).toBeTruthy();
    });
  });

  // it("Check submit Disabled correctly", () =>{
  //   fixture.detectChanges();
  //   let submitButton:DebugElement = de.query(By.css('button'));
  //   console.log(submitButton.properties);
  //   expect(submitButton.properties.disabled).toBeTruthy();
  // });

  it("Check Submit Enables Properly", () => {
    de.query(By.css('[name="firstName"]')).nativeElement.value = "Jimmy";
    de.query(By.css('[name="lastName"]')).nativeElement.value = "John";
    de.query(By.css('[name="email"]')).nativeElement.value = "jimmy@mail";
    de.query(By.css('[name="userName"]')).nativeElement.value = "jimmy369";
    de.query(By.css('[name="securityAnswer"]')).nativeElement.value = "answer";
    de.query(By.css('[name="password"]')).nativeElement.value = "CorrectPa$$w0rd1";
    de.query(By.css('[name="confirmPW"]')).nativeElement.value = "CorrectPa$$w0rd1";
    const submitButton: DebugElement = de.query(By.css('button'));
    expect(submitButton.properties.disabled).toBeFalsy();
  });

});
