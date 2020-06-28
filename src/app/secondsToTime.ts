import { Directive, Input, ElementRef } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';

@Directive({
  selector: '[appTime]'
})
export class SecondToTimeDirective {
  @Input('appTime') time: string;

  constructor(private el: ElementRef) {
    console.log(this.time);
    
  }

  ngOnInit() {
    console.log(this.time);
    const duration = moment.duration(this.time, 'seconds');
    this.el.nativeElement.innerHTML = duration.format('h:mm')+ " min";

  }



}