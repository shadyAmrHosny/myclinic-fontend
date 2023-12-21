import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient/patient.component';
import { AuthService } from './auth.service';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    LoginComponent,
    SignupComponent,
    PatientComponent,
    UpdateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
