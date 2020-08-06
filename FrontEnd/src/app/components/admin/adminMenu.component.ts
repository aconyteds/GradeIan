import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { AdminService } from "./admin.service";

@Component({
  selector: 'app-admin-menu',
  templateUrl: "./adminMenu.template.html",
  styles: [`
  `]
})

export class AdminMenuComponent implements OnInit {
  public activeNavigation: string;
  private authFailed = false;
  private userId!: number;
  public fullName = "";
  public isAdmin = false;
  public isSiteAdmin = false;
  private routes: string[] = ["password", "account", "users", "students", "licenses"];
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.getUserDetails();
    this.checkYourPrivelege();
    this.updateActiveNavigation(this.router.url);
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNavigation(event.urlAfterRedirects);
        if (!this.userId) {
          this.getUserDetails();
        }
      }
    });
  }

  private checkYourPrivelege() {
    this.adminService.checkYourPrivelege().subscribe((response: any)  => {
      if (response.response !== "0") {
        this.isAdmin = response.groupAdmin === "1";
        this.isSiteAdmin = response.groupAdmin === "1";
      } else {
        this.isAdmin = false;
        this.isSiteAdmin = false;
      }
    });
  }

  private getUserDetails() {
    if (!!window.sessionStorage.getItem("token")) {
      this.adminService.getUserDetails()
        .subscribe((response: any) => {
          if (!!response.userId) {
            this.userId = parseInt(response.userId, 10);
            this.fullName = response.firstName + " " + response.lastName;
          } else {
            if (!this.authFailed) {
              this.authFailed = true;
              setTimeout(() => { this.getUserDetails(); }, 2500);
            }
          }
        });
    } else {
      this.router.navigate(["login"]);
    }
  }

  private updateActiveNavigation(navigationString: string) {
    this.routes.some((route: string) => {
      if (navigationString.toLowerCase().search(route) !== -1) {
        this.activeNavigation = route;
        return true;
      }
    });
  }

  public getDateDisplay(): string {
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  public updateAccount(event: Event) {
    event.preventDefault();
    this.router.navigate(["admin/updateAccount"]);
  }

  public updatePassword(event: Event) {
    event.preventDefault();
    this.router.navigate(["admin/updatePassword"]);
  }

  public viewUsers(event: Event) {
    event.preventDefault();
    this.router.navigate(["admin/groupUsers"]);
  }

  public viewStudents(event: Event) {
    event.preventDefault();
    this.router.navigate(["admin/groupStudents"]);
  }

  public logout(event?: Event) {
    if (!!event) {
      event.preventDefault();
    }
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
