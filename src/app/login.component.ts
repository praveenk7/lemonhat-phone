import { Component } from '@angular/core';
//import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {TwilioService} from './_services/twilio.service';
//import {TabsComponent} from './tabs/tabs.component';
import {VerifyPhone} from './phone.verify.component';

@Component({    
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent { 
    constructor(
        public navCtrl: NavController,
        public twilioService:TwilioService       
    ) {};

    phone:string;
    twilioToken:string;
    client:any;
    //countryCode: number;
    selectedCountryCode: any = "91";
    login(){     
        //this.navCtrl.push(VerifyPhone, {});   
         if(this.phone){                        
             this.twilioService.getPhoneVerificationToken(this.phone, this.selectedCountryCode).subscribe(
                  data=> {
                      let response = JSON.parse((<any>data)._body);
                      if (response.status == 200) {
                          this.navCtrl.push(VerifyPhone, {
                              "phone": this.phone,
                              "countryCode": this.selectedCountryCode
                          });
                      }
                  },
                 (error) => console.log('error', error),
              )
            
         }
    }
}