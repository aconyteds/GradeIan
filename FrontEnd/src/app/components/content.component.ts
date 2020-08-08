import {Component} from "@angular/core";

@Component({
  selector: "content",
  template: `
    <div class="row m-0">
      <div class="col p-0">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})

export class ContentComponent {

}
