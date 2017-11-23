import { Component } from '@angular/core';
import { Router,  NavigationExtras } from '@angular/router';
//import { Platform } from 'ionic-angular';

import {TwilioService} from './_services/twilio.service';

//declare const Fingerprint2: any;
//declare const Twilio: any;
@Component({    
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent { 
    constructor(
        private twilioService:TwilioService,
        private router: Router) {};

    phone:string;
    twilioToken:string;
    client:any;
    //countryCode: number;
    selectedCountryCode: any = "91";
    login(){
        if(this.phone){
            //this.countryCode=91;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "phone": this.phone,
                    "countryCode": this.selectedCountryCode
                }
            };
            this.twilioService.getPhoneVerificationToken(this.phone, this.selectedCountryCode).subscribe(
                 data=> {
                     let response = JSON.parse((<any>data)._body);
                     if (response.status == 200) {
                         this.router.navigate(['verifyphone'], navigationExtras);
                     }
                 },
                (error) => console.log('error', error),
             )
            
        }
    }
}