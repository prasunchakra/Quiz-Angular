import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgeventService {

  private clearInputSource = new Subject<void>();
  clearInput$ = this.clearInputSource.asObservable();

  emitClearInput() {
    this.clearInputSource.next();
  }
}
