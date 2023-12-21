import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patientId!: string;

  setPatientId(id: string): void {
    this.patientId = id;
  }

  getPatientId(): string {
    return this.patientId;
  }
}
