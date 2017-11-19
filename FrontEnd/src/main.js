"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../node_modules/@types/jquery/index.d.ts" />
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
//import { platformBrowser } from '@angular/platform-browser';
var app_module_1 = require("./app/modules/app.module");
var $ = require("jquery");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//platformBrowser().bootstrapModuleFactory(AppModule);
//DOM is ready, so lets get started
$(function () {
    $("loader.loader").remove();
});
//# sourceMappingURL=main.js.map