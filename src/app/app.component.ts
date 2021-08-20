import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  languages: string[] = ['Portugese', 'English'];
  // defaultLanguage: string = "Portugese";
  countries: string[] = ['Brazil'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.personalDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
    this.addressDetails = this.formBuilder.group({
      language: ['Portugese', Validators.required],
      country: ['Brazil', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
    this.educationalDetails = this.formBuilder.group({
      highest_qualification: ['', Validators.required],
      university: ['', Validators.required],
      total_marks: ['', Validators.required],
    });
    console.log(this.personalDetails);

    if (this.step === 1) {
      this.personal_step = true;
    }
  }

  get personal() {
    return this.personalDetails.controls;
  }
  get address() {
    return this.addressDetails.controls;
  }
  get education() {
    return this.educationalDetails.controls;
  }

  next() {
    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalDetails.invalid) {
        this.validateAllFormFields(this.personalDetails);
        return;
      }
      this.step++;
    }
    if (this.step == 2) {
      this.address_step = true;
      if (this.addressDetails.invalid) {
        return;
      }
      this.step++;
    }
  }
  previous() {
    if (this.step == 1) {
      this.personal_step = true;
      return;
    }
    this.step--;
    if (this.step == 2) {
      this.education_step = false;
    }
  }
  submit() {
    if (this.step == 3) {
      this.education_step = true;
      if (this.educationalDetails.invalid) {
        console.log('INVALID');
        return;
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control?.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}
