import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: "./admin.template.html",
  styles: [`
    .active {
      font-weight:bold;
      text-transform: uppercase;
    }
  `]
})

export class AdminComponent implements OnInit {
  public activeNavigation: string;
  public isAdmin = false;
  public isSiteAdmin = false;
  private routes: string[] = ["password", "account", "users", "students", "licenses"];
  constructor(
    private router: Router
  ) {}

  public ngOnInit() {
    this.updateActiveNavigation(this.router.url);
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNavigation(event.urlAfterRedirects);
      }
    });
  }

  private updateActiveNavigation(navigationString: string) {
    this.routes.some((route: string) => {
      if (navigationString.toLowerCase().search(route) !== -1) {
        this.activeNavigation = route;
        return true;
      }
    });
  }

  public updateAccount(event: Event) {
    event.preventDefault();
    this.router.navigate(["/admin/updateAccount"]);
  }

  public updatePassword(event: Event) {
    event.preventDefault();
    this.router.navigate(["/admin/updatePassword"]);
  }
}
