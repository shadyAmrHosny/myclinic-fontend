import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
interface Slot {
  av: any;
  date: string;
  doctor: any;
  hour: string;
  _id: any;
  _v: any;
}
interface Appointment {
  id: any;
  patient: any;
  slot: Slot;
  _v: any;
  _id: string;
}
interface doctor {
  email: string;
  id: string;
  name: string;
  role: string;
  _v: any;
  _id: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  doctorId: string = '';
  patientData: any;
  patientName: string = '';
  patientDate: string = '';
  patientTime: string = '';
  patientDoctor: string = '';
  selectedSlots: Slot[] = [];
  Doctors: doctor[] = [];
  newAppointment: Appointment = {
    id: '',
    patient: '',
    slot: { av: '', date: '', doctor: '', hour: '', _id: '', _v: '' },
    _v: '',
    _id: '',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  getDoctors(): void {
    this.http
      .get('http://localhost:3000/api/v1/users/?role=doctor')
      .subscribe((response: any) => {
        // console.log(response.data);
        this.Doctors = response.data.users;
        // console.log(this.Doctors);
      });
  }

  getDoctorAppointment(id: any): void {
    this.http
      .get('http://localhost:3000/api/v1/users/doctorSlots/' + this.doctorId)
      .subscribe((response: any) => {
        console.log();
        this.selectedSlots = response.data.slots;
      });
  }
}
