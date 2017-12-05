import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {TabsComponent} from './tabs/tabs.component';
import {TwilioService} from './_services/twilio.service';
import {User} from './user';

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
        private userObj:User,
        private storage: Storage,
        private alertCtrl: AlertController       
    ){
        this.userObj.phone=this.navParams.get('phone');
        this.userObj.countryCode=this.navParams.get('countryCode');
        //this.navCtrl.setRoot(VerifyPhone);
    };    
   
    phone:string;  
    countryCode:number;
    otp:number;  
    twilioToken:string;
    client:any;    
    verify(){
        if (this.otp){
            this.twilioService.verifyPhoneToken(this.otp, this.userObj).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {                 
                    this.storage.set('user', response.uid);
                    this.navCtrl.push(TabsComponent, {});
                    }else {
                       let alert = this.alertCtrl.create({
                           subTitle: response.body,
                           buttons: ['Ok']
                           });
                           alert.present();
                           }
                           })

            // ////uncoment to test with hardcoded values
            // this.storage.set('user', "AV_9IGx-OEwIORfq8zsq");
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
        this.twilioService.getPhoneVerificationToken(this.userObj.phone, this.userObj.countryCode).subscribe(
            data=> {
                     let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                    alert("OTP resend to mobile no");
                }
            }
            )
    }

}