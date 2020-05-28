import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AccountService } from "../services/account.service";

@Component({
  selector: 'home',
  template: `
    <div class="loader">
      <div class="text-center">
        <span>Hello, {{firstName}}.
          <br/>
          <button class="btn btn-primary" routerLink="/newClass"><i class="fa fa-plus"> </i> Create Class</button>
        </span>

      </div>
    </div>
  `
})

export class Home implements OnInit {
  public firstName = "";
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.getFirstName(window.sessionStorage.getItem("token"));
  }

  public getFirstName(token: string): void {
    if (!!token) {
      this.accountService.getUserDetails(token)
        .subscribe((response) => {
          console.log(response);
          if (response.token && response.token.search(/[a-zA-Z]/) > -1) {
            // Means our token ran out, but we fetched a new one so recursive this
            this.getFirstName(response.token);
          } else if (response.FirstName) {
            this.firstName = response.FirstName;
          }
        });
    } else {
      // this.router.navigate(['/login', {}]);
    }
  }
}
