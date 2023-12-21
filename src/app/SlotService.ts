import { Injectable, EventEmitter } from '@angular/core';
import { Slot } from './models/slot';
@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private slots: Slot[] = [];
  slotAdded = new EventEmitter<Slot>();
  addSlot(slot: Slot): void {
    this.slots.push(slot);
    this.slotAdded.emit(slot);
  }

  getSlots(): Slot[] {
    return this.slots;
  }
  deleteSlot(slot: Slot): void {
    const index = this.slots.indexOf(slot);
    if (index !== -1) {
      this.slots.splice(index, 1);
    }
  }
  constructor() {}
}
