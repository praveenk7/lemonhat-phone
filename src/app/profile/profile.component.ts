import { Component } from '@angular/core';

import {TwilioService } from '../_services/twilio.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import {User } from '../user';
import { LoginComponent} from '../login.component';


@Component({  
    templateUrl: 'profile.component.html',
    styleUrls: ['./login.component.css']
})
export class ProfileComponent{
    userId: string; //= "AV_9IGx-OEwIORfq8zsq";
    loader: any;
    constructor(private twilioService: TwilioService,
        public nativeStorage: NativeStorage,
        public navCtrl: NavController,
        private userObj: User,
        private storage: Storage,
        public loadingCtrl: LoadingController    
    ) {
        this.storage.get('user').then((val) => {
                console.log(val);
                if(!val){
                  this.navCtrl.push(LoginComponent);
                } else {    
                    this.loader = this.loadingCtrl.create({
                        content: "Loading...",
                    });
                    this.loader.present();       
                  this.userId=val.id;
                  this.twilioService.getUserDetails([this.userId]).subscribe(
                    data=> {
                      let obj = (JSON.parse((<any>data)._body)).usr;
                        if (obj && obj.length > 0) {
                            this.userObj.email = obj[0].others.email;
                            this.userObj.phone = obj[0].others.phone;
                            this.userObj.userName = obj[0].others.userName;
                            this.userObj.countryCode = obj[0].others.countryCode;
                            this.userObj.id = obj[0].id;
                        }
                        this.loader.dismiss();
                  });
                }
              },
              error => {
                console.log(error);
                this.navCtrl.push(LoginComponent);
              }
            );
               
         //});
         }
  
 
    updateUser() {
        this.twilioService.updateUserDetails(this.userObj).subscribe(
            data=> {
                let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                    alert("saved successfully");
                }
            });;
    }

   
}