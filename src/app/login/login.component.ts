import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../user-response';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}
  email: string = '';
  password: string = '';
  role: string = '';

  // onSubmit() {
  //   console.log('Email:', this.email);
  //   console.log('Password:', this.password);
  // }

  loginSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };
    //send data of user
    this.http
      .post<any>('http://127.0.0.1:3000/api/v1/users/login', data)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          console.log('Server Response:', response);
          // Authentication successful, handle the response from the backend
          if (response.status === 'success' && response.data) {
            // response.selectedType === 'patient' ||
            // response.selectedType === 'doctor'
            // Redirect to the appropriate component based on user type
            const userData = response.data;
            this.authService.userId = userData.user._id;
            console.log(this.authService.userId);

            if (userData.user.role === 'patient') {
              this.patientService.setPatientId(userData.user._id);
            } else if (userData.user.role === 'doctor') {
              this.doctorService.setDoctorId(userData.user._id);
            }
            this.checkType(userData.user.role);
            console.log('Registration Success:');
          } else {
            // Handle the case where the user type is not recognized
            console.log('Unknown user ID or missing role in response');
          }
        },
        (error) => {
          // Handle authentication errors, e.g., display an error message
          console.error('Authentication failed:', error);
          alert('Authentication failed');
        }
      );
  }
  checkType(role: string) {
    if (role === 'patient') {
      this.router.navigate(['../patient']);
    } else if (role === 'doctor') {
      this.router.navigate(['../doctor']);
    }
  }
}
