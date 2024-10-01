import { Component } from "@angular/core";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    private username!: string;
    private password!: string;

    constructor() {}
  }