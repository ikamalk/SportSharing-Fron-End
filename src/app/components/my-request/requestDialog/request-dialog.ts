import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { RequestService } from 'src/app/services/request.service';
import { MatDialog } from '@angular/material/dialog';
declare var google;
@Component({
    selector: 'request-dialog',
    templateUrl: 'request-dialog.html',
  })
  export class RequestDialog {
    requestForm: FormGroup;
    account:Account;
    @ViewChild('search') searchElementRef: ElementRef;

    constructor(private formBuilder:FormBuilder,private mapsAPILoader:MapsAPILoader,private ngZone:NgZone,
        private requestService:RequestService,private matDialog: MatDialog){
            this.account = JSON.parse(localStorage.getItem("account"));
        this.requestForm = this.formBuilder.group({
            id: [0],
            account: [this.account, Validators.required],
            sport_type: ["", Validators.required],
            player: ["", Validators.required],
            skill_level: ["", Validators.required],
            time_schedule: ["", Validators.required],
            address: ["", Validators.required]
          });
    }

    sendRequest(){
        console.log(this.searchElementRef.nativeElement.value);
        this.requestForm.value.address = this.searchElementRef.nativeElement.value;
       this.requestService.addRequest(this.requestForm.value).then(request=>{
           console.log(request);
           this.matDialog.closeAll();    
           });
    }

    ngAfterViewInit(){
            this.findAdress();
    }


    findAdress(){
        this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                 // some details
                // let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 //set latitude, longitude and zoom
               });
             });
           });
       }
  }