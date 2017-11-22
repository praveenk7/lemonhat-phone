import { Component, OnInit } from '@angular/core';
import {TwilioService} from './_services/twilio.service';
import { Router, ActivatedRoute, NavigationExtras} from "@angular/router";
import {User} from './user';

declare const Fingerprint2: any;
declare const Twilio: any;
@Component({   
    templateUrl: 'phone.verify.component.html',
    styleUrls: ['./login.component.css']
})
export class VerifyPhone{
    constructor(private twilioService:TwilioService,
    private route:ActivatedRoute,
    private router: Router,
    private userObj:User){
        this.route.queryParams.subscribe(params => {
            this.userObj.phone = params["phone"];
            this.userObj.countryCode = params["countryCode"];
        });
    }
    phone:string;  
    countryCode:number;
    otp:number;  
    twilioToken:string;
    client:any;    
    verify(){
        if(this.userObj.phone){

            this.twilioService.verifyPhoneToken(this.otp, this.userObj).subscribe(
                data=> {
                    let response = JSON.parse(data._body);
                    if (response.status == 200) {
                        //this.client = new Twilio.Chat.Client(response.token, { logLevel: 'debug' });
                        //this.twilioService.setTwilioClient(this.client);
                    let navigationExtras: NavigationExtras = {
                            queryParams: {
                                "uid": response.uid,
                            }
                        };
                        this.router.navigate(['profile'], navigationExtras);
                    }
                }
            )
        }
    }

}