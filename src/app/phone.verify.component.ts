import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {TabsComponent} from './tabs/tabs.component';
import {TwilioService} from './_services/twilio.service';
import {User} from './user';

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
        private userObj:User      
    ){
        this.userObj.phone=this.navParams.get('phone');
        this.userObj.countryCode=this.navParams.get('countryCode');
    };    
   
    phone:string;  
    countryCode:number;
    otp:number;  
    twilioToken:string;
    client:any;    
    verify(){
        //Start Praveen Change
        // this.nativeStorage.setItem('user', {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2E1OTMxNjk3ODE5ZTdhYjMyZmVlOWU0ZmUyYTZlZDJiLTE1MTE3ODAyODEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJBVl85SUd4LU9Fd0lPUmZxOHpzcSIsImNoYXQiOnsiZW5kcG9pbnRfaWQiOiJ1bmRlZmluZWRBVl85SUd4LU9Fd0lPUmZxOHpzcWJyb3dzZXIiLCJwdXNoX2NyZWRlbnRpYWxfc2lkIjoiQ1JlOWM1ZWZmMjllNzQ0NzA5ZDdkZjg3NWY4YTc5N2JmMCJ9fSwiaWF0IjoxNTExNzgwMjgxLCJleHAiOjE1MTE4MjAyODEsImlzcyI6IlNLYTU5MzE2OTc4MTllN2FiMzJmZWU5ZTRmZTJhNmVkMmIiLCJzdWIiOiJBQzc1NTk3MGI0YmI3NjJiZTQ3MTZjZDIxZmQzM2Y3MWE5In0.8l_OKkrAWTjSebsiZXosI1E9-L0fHRhz92gX5otQ0MM', 'uid':'dfsfjlds'})
        // .then(
        //   () => {console.log('Stored item!')
        //   this.navCtrl.push(TabsComponent, {});
        // },
        //   error => console.error('Error storing item', error)
        // );

        //End

        
        if(this.userObj.phone){

            this.twilioService.verifyPhoneToken(this.otp, this.userObj).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                       this.nativeStorage.setItem('user', {'token': response.token, 'uid':response.uid}).
                       then(
                           () => {console.log('Stored item!')
                           this.navCtrl.push(TabsComponent, {});
                       },
                       error => console.error('Error storing item', error)
                    );
                        
                    }
                }
            )
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