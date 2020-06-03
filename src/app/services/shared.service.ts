import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private titleSubject = new Subject<any>();

  constructor() { }


  sendNewTab(tab:string) {
    this.titleSubject.next(tab);
  }
  getNewTab(): Observable<any>{ 
    return this.titleSubject.asObservable();
  }
}
