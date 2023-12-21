import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { HttpClient } from '@angular/common/http';
interface Slot {
  av: any;
  date: string;
  doctor: any;
  hour: string;
  _id: any;
  _v: any;
}
interface getslots {
  date: string;
  hour: number;
}
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  doctorData: any;
  selectedDate: string = '';
  selectedTime: string = '';
  newSlott: Slot = { av: '', date: '', doctor: '', hour: '', _id: '', _v: '' };
  slov2: getslots = { date: '', hour: 0 };
  slots: Slot[] = [];

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getDoctor();
  }
  getDoctor() {
    this.http
      .get('http://localhost:3000/api/v1/users/me')
      .subscribe((response: any) => {
        this.doctorData = response.data;
        console.log(response.data);
        this.slots = response.data.user.slots;
        console.log(this.slots);
      });
  }
  // fetchDoctorData() {
  //   const doctorId = this.doctorService.getDoctorId();

  //   this.doctorService.getDoctorById().subscribe(
  //     (data) => {
  //       console.log(doctorId);
  //       this.doctorData = data;
  //       console.log('Doctor Data:', this.doctorData);
  //       this.slots = data.data.user.slots;
  //       console.log(this.slots);
  //     },
  //     (error) => {
  //       console.error('Error fetching doctor data:', error);
  //     }
  //   );
  // }
  addSlot(slot: getslots): void {
    this.http
      .post('http://localhost:3000/api/v1/slots', slot)
      .subscribe((response: any) => {
        this.getDoctor();
        console.log(response.data);
        this.newSlott = {
          av: '',
          date: '',
          doctor: '',
          hour: '',
          _id: '',
          _v: '',
        };
      });
  }
  deleteSlot(slot: Slot): void {
    const indx = this.slots.indexOf(slot);
    if (indx > -1) {
      this.http
        .delete('http://localhost:3000/api/v1/slots/' + this.slots[indx]._id)
        .subscribe((response) => {
          this.slots.splice(indx, 1);
          this.getDoctor();
        });
    }
  }
  logout(): void {
    localStorage.setItem('token', '123');
    this.router.navigate(['login']);
  }
}
