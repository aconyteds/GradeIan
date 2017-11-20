import {Component, OnInit} from "@angular/core";
import {SecurityQuestion} from "../../interfaces";
import {AccountService} from "../../services/account.service";

@Component({
  selector:"security-question",
  template:`
    <select class='form-control'>
      <option *ngFor="let question of questions" [value]="question.ID">{{question.Question}}</option>
    </select>
  `
})

export class SecurityQuestions implements OnInit{
  questions:SecurityQuestion[];
  constructor(
    private accountService:AccountService
  ){
  }

  ngOnInit(){
    this.getSecurityQuestions();
  }

  getSecurityQuestions(): void {
    this.accountService.getSecurityQuestions()
      .subscribe(response=>this.questions = response);
  }
}
