import { Component, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { RequestService } from 'src/app/services/request.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from 'src/app/models/Request';
declare var google;
@Component({
    selector: 'request-dialog',
    templateUrl: 'request-dialog.html',
    styleUrls: ['request-dialog.scss']
  })
  export class RequestDialog {
    requestForm: FormGroup;
    account:Account;
    request:Request;
    @ViewChild('search') searchElementRef: ElementRef;
    geocoder: any;

    constructor(private formBuilder:FormBuilder,private mapsAPILoader:MapsAPILoader,private ngZone:NgZone,
        private requestService:RequestService,private matDialog: MatDialog,@Inject(MAT_DIALOG_DATA) public requestData: Request){
            this.account = JSON.parse(localStorage.getItem("account"));
            this.request = requestData;
        if(this.request == null){
          this.requestForm = this.formBuilder.group({
            id: [0],
            account: [this.account, Validators.required],
            sport_type: ["", Validators.required],
            player: ["", Validators.required],
            player_miss: ["", Validators.required],
            skill_level: ["", Validators.required],
            time_schedule: ["", Validators.required],
            address: ["", Validators.required],
            lat: [0],
            lng: [0],
            expired: [false],
            completed:[false]
          });
        } else {
          this.requestForm = this.formBuilder.group({
            id: [this.request.id],
            account: [this.request.account, Validators.required],
            sport_type: [this.request.sport_type, Validators.required],
            player: [this.request.player, Validators.required],
            player_miss: [this.request.player, Validators.required],
            skill_level: [this.request.skill_level, Validators.required],
            time_schedule: [this.request.time_schedule, Validators.required],
            address: [this.request.address, Validators.required],
            lat: [this.request.lat],
            lng: [this.request.lng],
            expired: [this.request.expired],
            completed:[this.request.completed]
          });
        }

    }

    async sendRequest(){
        this.requestForm.value.player_miss = this.requestForm.value.player;
        this.requestForm.value.address = this.searchElementRef.nativeElement.value;
       await this.geocodeAddress();
       this.requestService.addRequest(this.requestForm.value).then(request=>{
        this.matDialog.closeAll();    
        });

    }

    updateRequest(){
      this.requestForm.value.player_miss = this.requestForm.value.player;
      this.requestForm.value.address = this.searchElementRef.nativeElement.value;
      this.requestService.updateRequest(this.requestForm.value).then(request=>{
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


       geocodeAddress() {
        return new Promise((resolved,rejected)=>{
          this.mapsAPILoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder;
            this.geocoder.geocode({'address': this.requestForm.value.address}, (results, status) => {
              if (status === 'OK') {
               this.requestForm.value.lat = results[0].geometry.location.lat();
               this.requestForm.value.lng = results[0].geometry.location.lng();
               resolved();
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
                rejected();
              }
        });
         });
         })
    }
  }