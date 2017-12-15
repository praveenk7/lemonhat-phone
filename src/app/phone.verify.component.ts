import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {TabsComponent} from './tabs/tabs.component';
import {TwilioService} from './_services/twilio.service';
import {userObj} from './user';

import { Storage } from '@ionic/storage';

//declare const Fingerprint2: any;
//declare const Twilio: any;
@Component({   
    templateUrl: 'phone.verify.component.html',
    styleUrls: ['./login.component.css']
})
export class VerifyPhone{
    constructor(
        private nativeStorage: NativeStorage,
        public navCtrl: NavController,
        public navParams:NavParams, 
        private twilioService:TwilioService,
        //private userObj:user,
        private storage: Storage,
        private alertCtrl: AlertController       
    ){
        console.log("useree", userObj);
         userObj.phone=this.navParams.get('phone');
         userObj.countryCode=this.navParams.get('countryCode');
        //this.navCtrl.setRoot(VerifyPhone);
    };    
   
    phone:string;  
    countryCode:number;
    otp:number;  
    twilioToken:string;
    client:any;    
    verify(){
        if (this.otp){
            this.twilioService.verifyPhoneToken(this.otp, userObj).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {  
                    userObj.id=response.uid;               
                    this.storage.set('user',userObj);
                    this.navCtrl.push(TabsComponent, {});
                    }else {
                       let alert = this.alertCtrl.create({
                           subTitle: response.body,
                           buttons: ['Ok']
                           });
                           alert.present();
                           }
                           })

            ////uncoment to test with hardcoded values
            // userObj.id="AV_9IGx-OEwIORfq8zsq";
            // this.storage.set('user', userObj);
            // this.navCtrl.push(TabsComponent,{});
        } else {
            let alert = this.alertCtrl.create({
                //title: 'Low battery',
                subTitle: "Please enter otp.",
                buttons: ['Ok']
            });
            alert.present();
        }
    }

    resendOTP() {
        this.twilioService.getPhoneVerificationToken(userObj.phone, userObj.countryCode).subscribe(
            data=> {
                     let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                    alert("OTP resend to mobile no");
                }
            }
            )
    }

}