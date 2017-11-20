///<reference path="../node_modules/@types/jquery/index.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { platformBrowser } from '@angular/platform-browser';
import { AppModule }              from './app/modules/app.module';
import * as $ from "jquery";

platformBrowserDynamic().bootstrapModule(AppModule);
//platformBrowser().bootstrapModuleFactory(AppModule);
//DOM is ready, so lets get started
$(function(){
  $("loader.loader").remove(); 
});
