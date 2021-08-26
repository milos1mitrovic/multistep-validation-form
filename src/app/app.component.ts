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
  showForm = false;

  onRegisterClick() {
    this.showBackdrop = true;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.showBackdrop = false;
  }
  

  ngOnInit() {}
}
