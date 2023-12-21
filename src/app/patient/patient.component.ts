import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { newAppointment } from '../newAppointment';
import { AuthService } from '../auth.service';

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
interface slottt {
  slot: string;
}
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  ngOnInit(): void {
    this.fetchAppointments();
    this.getDoctors();
  }
  slotid: slottt = { slot: '' };
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
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  appointments: Appointment[] = [];

  // newAppointment: Appointment = {
  //   id: any;
  // patient: any;
  // slot: Slot;
  // _v: any;
  // _id: string;
  // };
  // cancelAppintment(index: number): void {
  //   this.appointments.splice(index, 1);

  // }

  // editAppointment(index: number): void {}
  // reserveAppointment(): void {
  //   // console.log('Date', this.newAppointment.date);
  //   // console.log('Time', this.newAppointment.time);
  //   // console.log('Doctor', this.newAppointment.doctor);
  //   if (
  //     this.newAppointment.date &&
  //     this.newAppointment.time &&
  //     this.newAppointment.doctor
  //   ) {
  //     this.newAppointment.patientId = this.authService.userId;
  //     this.http
  //       .post<any>(
  //         'http://127.0.0.1:3000/api/v1/appointments/reserve',
  //         this.newAppointment
  //       )
  //       .subscribe(
  //         (response) => {
  //           console.log('reservation Successful:', response);
  //           this.fetchAppointments(this.authService.userId);
  //           this.newAppointment = {
  //             doctor: '',
  //             date: '',
  //             time: '',
  //             patientId: this.authService.userId,
  //           };
  //         },
  //         (error) => {
  //           console.error('Error during reservation:', error);
  //         }
  //       );
  //   }
  // }

  // fetchPatientData(userId: string): void {
  //   // Make an HTTP request to fetch patient data
  //   this.http
  //     .get<any>(`http://127.0.0.1:3000/api/v1/users/patient/${userId}`)
  //     .subscribe(
  //       (patientData) => {
  //         console.log('Patient Data:', patientData);
  //         this.patientName = patientData.name;
  //         this.patientDate = patientData.date;
  //         this.patientTime = patientData.time;
  //         this.patientDoctor = patientData.doctor;

  //         // Update your component properties or perform any other actions with the patient data
  //       },
  //       (error) => {
  //         console.error('Error fetching patient data:', error);
  //       }
  //     );
  // }

  fetchAppointments(): void {
    this.http.get('http://localhost:3000/api/v1/users/me').subscribe(
      (response: any) => {
        this.patientData = response.data;
        // console.log(response.data);
        this.appointments = response.data.user.appointments;
        // console.log(this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  addAppointment(slotid: any): void {
    this.http
      .post('http://localhost:3000/api/v1/appointments/', slotid)
      .subscribe((response: any) => {
        console.log(slotid);
        this.fetchAppointments();

        this.newAppointment = {
          id: '',
          patient: '',
          slot: { av: '', date: '', doctor: '', hour: '', _id: '', _v: '' },
          _v: '',
          _id: '',
        };
      });
  }

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
      .get('http://localhost:3000/api/v1/users/doctorSlots/' + id)
      .subscribe((response: any) => {
        console.log(response);
        this.selectedSlots = response.data.slots;
        console.log(this.selectedSlots);
      });
  }

  cancelAppointment(appointment: Appointment): void {
    const indx = this.appointments.indexOf(appointment);
    if (indx > -1) {
      this.http
        .delete(
          'http://localhost:3000/api/v1/appointments/' +
            this.appointments[indx]._id
        )
        .subscribe((response) => {
          this.appointments.splice(indx, 1);
        });
      this.fetchAppointments();
    }
  }
  // updateSlot(slot: Slot): void {
  //   this.router.navigate(['update']);
  //   const index = this.selectedSlots.indexOf(slot);
  //   this.http
  //     .put('http://localhost:3000/api/v1/users/doctorSlots/' + slot._id)
  //     .subscribe();
  // }
  logout(): void {
    localStorage.setItem('token', '123');
    this.router.navigate(['login']);
  }
}
