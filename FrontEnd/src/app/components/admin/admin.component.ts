import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { AdminService } from "./admin.service";

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
  private routes: string[] = ["password", "account", "users", "students", "license"];
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.checkYourPrivelege();
    this.updateActiveNavigation(this.router.url);
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNavigation(event.urlAfterRedirects);
      }
    });
  }

  private checkYourPrivelege() {
    this.adminService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isAdmin = response.groupAdmin === "1";
        this.isSiteAdmin = response.siteAdmin === "1";
      } else {
        this.isAdmin = false;
        this.isSiteAdmin = false;
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

  public navigateToPage(event: Event, route: string) {
    event.preventDefault();
    this.router.navigate([route]);
  }
}
