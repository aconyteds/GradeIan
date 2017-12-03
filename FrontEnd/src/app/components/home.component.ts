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
    this.getFirstName(window.sessionStorage.getItem("token"));
  }

  getFirstName(token:string):void{
    this.accountService.getUserDetails(token)
      .subscribe(response => {
        if(response.token && response.token.search(/[a-zA-Z]/)>-1){
          //Means our token ran out, but we fetched a new one so recursive this
          this.getFirstName(response.token);
        }
        else if(response.FirstName){
          this.firstName = response.FirstName;
        }
      } );
  }
};
