import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css'],
})
export class ValidationFormComponent implements OnInit {
  @Output() onCloseForm = new EventEmitter<boolean>();

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  registerDetails!: FormGroup;
  personal_step = true;
  address_step = false;
  register_step = false;
  step = 1;
  formClosed: boolean = false;

  languages: string[] = ['Portugese', 'English'];
  countries: string[] = ['Brazil'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

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
  }
  submit() {
    if (this.step == 3) {
      this.register_step = true;
      if (this.registerDetails.invalid) {
        this.validateAllFormFields(this.registerDetails);
        return;
      }
    }

    let merged = {
      ...this.personalDetails.value,
      ...this.addressDetails.value,
      ...this.registerDetails.value,
    };
    this.onCreatePost(merged);
    this.personalDetails.reset();
    this.addressDetails.reset();
    this.registerDetails.reset();
  }

  onCreatePost(postData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPass: string;

    language: string;
    address: string;
    city: string;
    zip: string;

    taxpayerNumber: string;
    birthDate: string;
    phoneNumber: string;
  }) {
    this.http
      .post(
        'https://multi-step-validation-acc3c-default-rtdb.firebaseio.com/user.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
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

  next() {
    if (this.step == 1) {
      this.address_step = true;
      if (this.personalDetails.invalid) {
        this.validateAllFormFields(this.personalDetails);
        return;
      }
      this.step = 2;
    } else if (this.step == 2) {
      this.register_step = true;

      if (this.addressDetails.invalid) {
        this.validateAllFormFields(this.addressDetails);
        return;
      }
      this.step = 3;
    } else if (this.step == 3) {
      if (this.registerDetails.invalid) {
        this.validateAllFormFields(this.registerDetails);
        return;
      }
    }
  }
  // previous() {
  //   if (this.step == 1) {
  //     return;
  //   } else if (this.step == 2) {
  //     this.step--;
  //     this.personal_step = true;
  //     this.address_step = false;
  //     console.log(this.step);
  //   } else if (this.step == 3) {
  //     this.step--;
  //     this.register_step = false;
  //     this.address_step = true;
  //     console.log(this.step);
  //   }
  // }

  goTo(step: number, details?: FormGroup) {
    if (details != null && details != undefined) {
      if (details.invalid) {
        this.validateAllFormFields(details);
        return;
      }
    }
    this.step = step;
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

  closeForm() {
    this.onCloseForm.emit(this.formClosed);
  }
}
