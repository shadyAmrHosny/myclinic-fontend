import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { signupresponse } from '../signupresponse';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  role: string = '';
  passwordConfirm: string = '';
  registrationSuccess: boolean = false;
  registrationError: boolean = false;
  // getSelectedType(): string {
  //   return this.selectedType;
  // }

  // onSubmit() {
  //   console.log('Email:', this.email);
  //   console.log('Password:', this.password);
  // }
  constructor(private router: Router, private http: HttpClient) {}
  onSubmit() {
    const userData = {
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
    //Send the user registration data to the backend
    this.http
      .post<any>('http://127.0.0.1:3000/api/v1/users/signup', userData)
      .subscribe(
        (response) => {
          this.registrationSuccess = true;
          if (this.registrationSuccess == true) {
            this.router.navigate(['login']);
          }
          alert('Registration Success');
        },
        (error) => {
          // Handle any errors from the backend.
          this.registrationError = true;
          alert('Registration failed');
        }
      );
  }
}
