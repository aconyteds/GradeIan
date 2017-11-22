import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AccountService} from "../services/account.service";

@Component({
  selector: 'home',
  template: `
    <div class="loader">
      <div>
        <span>Hello, {{firstName}}.</span>
      </div>
    </div>
  `
})

export class Home implements OnInit {
  private firstName:string = "";
  constructor(
    private accountService:AccountService
  ){
  }

  ngOnInit(){
    this.getFirstName(parseInt(window.sessionStorage.getItem("userId")));
  }

  getFirstName(id:number):void{
    this.accountService.getUserDetails(id)
      .subscribe(response => this.firstName = response.FirstName);
  }
};
