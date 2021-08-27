import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  }

  onLoginClick() {
    this.showLoginForm = true;
  }

  closeForm() {
    this.showRegisterForm = false;
    this.showBackdrop = false;
  }

  closeLoginForm() {
    this.showLoginForm = false;
  }

  ngOnInit() {}
}
