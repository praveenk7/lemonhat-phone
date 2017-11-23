import { Component } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
//import { Platform } from 'ionic-angular';

//import {TwilioService} from './_services/twilio.service';

//declare const Fingerprint2: any;
//declare const Twilio: any;
@Component({
    //moduleId: module.id,
    selector: 'ion-app',
    templateUrl: 'app.component.html'
})
export class AppComponent { 
    // constructor(
    //     private twilioService:TwilioService,
    //     private route: ActivatedRoute,
    //     private router: Router) {};

    // name:string;
    // twilioToken:string;
    // client:any;
    // login(){
    //     if(this.name=="test"){
    //         new Fingerprint2().get((result, components) => {  
    //             this.twilioService.getToken(this.name,result).subscribe(                    
    //                 data=>{
    //                     this.twilioToken=data._body;
    //                     this.client = new Twilio.Chat.Client(data._body, { logLevel: 'debug' }); 
    //                     this.twilioService.setTwilioClient(this.client);
    //                     this.router.navigate(['home']);
    //                 }                  
    //            )
    //           });
    //     }
    // }
}