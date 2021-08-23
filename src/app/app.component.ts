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
  registerDetails!: FormGroup;
  personal_step = true;
  address_step = false;
  register_step = false;
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
    this.registerDetails = this.formBuilder.group({
      taxpayerNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    console.log(this.personalDetails);

    if (this.step === 1) {
      this.personal_step = true;
    }
    console.log(this.step);
  }

  get personal() {
    return this.personalDetails.controls;
  }
  get address() {
    return this.addressDetails.controls;
  }
  get register() {
    return this.registerDetails.controls;
  }

  // goTo(step: number, details: FormGroup) {
  //   console.log(details);
  //   if (details.invalid) {
  //     console.log('Validation');
  //     this.validateAllFormFields(details);
  //     return;
  //   }
  //   this.step = step;
  // }

  next() {
    if (this.step == 1) {
      this.address_step = true;
      if (this.personalDetails.invalid) {
        this.validateAllFormFields(this.personalDetails);
        console.log(this.step);
        return;
      }
      this.step = 2;
      console.log(this.step);
    } else if (this.step == 2) {
      this.register_step = true;

      if (this.addressDetails.invalid) {
        this.validateAllFormFields(this.addressDetails);
        return;
      }
      this.step = 3;
      console.log(this.step);
    } else if (this.step == 3) {
      console.log(this.step);
      if (this.registerDetails.invalid) {
        this.validateAllFormFields(this.registerDetails);
        return;
      }
    }
    // console.log(this.step);
  }
  previous() {
    if (this.step == 1) {
      return;
    } else if (this.step == 2) {
      this.step--;
      this.personal_step = true;
      this.address_step = false;
      console.log(this.step);
    } else if (this.step == 3) {
      this.step--;
      this.register_step = false;
      this.address_step = true;
      console.log(this.step);
    }
  }
  submit() {
    if (this.step == 3) {
      this.register_step = true;
      if (this.registerDetails.invalid) {
        console.log('INVALID');
        return;
      }
    }
    console.log('form submitted');
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
