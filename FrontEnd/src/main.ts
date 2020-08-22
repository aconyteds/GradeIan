/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/popper.js/index.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/modules/app.module';
import * as $ from "jquery";
import "bootstrap";

platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowser().bootstrapModuleFactory(AppModule);
// DOM is ready, so lets get started
$(() => {
  if (!window.sessionStorage) {
    // session Storage is needed for everything, so bounce the user if not supported
    $("section.loader").html("<div class='jumbotron m-1'>"
    + "<h2 class='text-danger'><i class='pr-1 fas fa-exclamation-triangle'></i>Incompatible Web Browser</h2>"
    + "<p>This application uses features not supported by your browser. Please use a different browser to access this application.</p></div>");
  } else {
    // Need to see if they are authorized to view the page they are on
    let valid = (window.sessionStorage.getItem("token") !== null);
    if (!valid) {
      const allowedRoutes = ["", "login", "recoveraccount", "newaccount"];
      valid = allowedRoutes.some((route: string) => window.location.pathname.replace("/", "").toLowerCase() === route);
    }

    if (valid) {
      // Partially validated
      $("section.loader").remove();
    } else {
      window.location.replace(window.location.origin + "/login");
    }
  }
});
