import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedArray = new Subject()
  selectedArrayRatings = new Subject()
  constructor() { }
 
}
