import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorId!: string;

  setDoctorId(id: string): void {
    this.doctorId = id;
  }

  getDoctorId(): string {
    return this.doctorId;
  }
  private apiUrl = 'http://localhost:3000/api/v1/users/user';
  private addslot = 'http://localhost:3000/api/v1/slots';
  constructor(private http: HttpClient) {}
  getDoctorById(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
