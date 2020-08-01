import { Component } from '@angular/core';

@Component({
  selector: 'main-login',
  styles: [
    `
    .main-login{
      position:fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index:999;
      background:#FFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    `
  ],
  template: `
    <div class="main-login">
      <div class="col col-md-8 offset-md-2 col-lg-6 offset-lg-3" style="margin-top:10px;">
        <div class="card">
          <div class="card-header text-center" style="margin-bottom:15px;">
            <h1 class="card-title">GradeIan</h1>
          </div>
          <div class="card-block">
           <login></login>
         </div>
         <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-auto">
              <a class="nav-link" href="https://youtu.be/Ev8y-_qyu7w" target="_blank">View Demo <i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
         </div>
       </div>
     </div>
    </div>
  `
})
// TODO:: Add a check to see if the user has a valid token, if so route to the home page instead
export class MainLogin {
  constructor() {
  }
}
