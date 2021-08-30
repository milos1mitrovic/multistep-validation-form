import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showBackdrop = false;
  showRegisterForm = false;
  showLoginForm = false;

  onRegisterClick() {
    this.showBackdrop = true;
    this.showRegisterForm = true;
    // this.dialog.open(ValidationFormComponent);
  }

  onLoginClick() {
    this.showBackdrop = true;
    this.showLoginForm = true;
    // this.dialog.open(LoginFormComponent);
  }

  closeForm() {
    this.showRegisterForm = false;
    this.showBackdrop = false;
  }

  closeLoginForm() {
    this.showBackdrop = false;
    this.showLoginForm = false;
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
}
