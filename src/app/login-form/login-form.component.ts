import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginDetails!: FormGroup;
  loginFormClosed: boolean = false;

  @Output() onCloseLoginForm = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginDetails = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get login() {
    return this.loginDetails.controls;
  }

  closeLoginForm() {
    this.onCloseLoginForm.emit(this.loginFormClosed)
  }
}
