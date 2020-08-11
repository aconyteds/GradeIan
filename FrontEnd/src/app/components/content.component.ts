import {Component, OnInit, OnChanges} from "@angular/core";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { AccountService } from "../services/account.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.template.html"
})

export class ContentComponent implements OnInit, OnChanges {
  public loaded = false;
  public loggedIn = false;
  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.loaded = true;
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.checkLoggedIn();
      }
    });
    this.checkLoggedIn();
  }

  public ngOnChanges() {
    this.checkLoggedIn();
  }

  private checkLoggedIn() {
    this.loggedIn = !!window.sessionStorage.getItem("token");
  }
}
