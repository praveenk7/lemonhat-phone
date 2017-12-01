import { Component } from '@angular/core';
//import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService } from '../_services/twilio.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import {User } from '../user';
import { LoginComponent} from '../login.component';

//declare const Fingerprint2: any;
//declare const Twilio: any;

@Component({  
    templateUrl: 'profile.component.html',
    styleUrls: ['./login.component.css']
})
export class ProfileComponent{
    userId: string //= "AV_9IGx-OEwIORfq8zsq";
    constructor(private twilioService: TwilioService,
        // private route: ActivatedRoute,
        // private router: Router,
        public nativeStorage: NativeStorage,
        public navCtrl: NavController,
        private userObj: User
    ) {
        // this.route.queryParams.subscribe(params => {
        //     this.userId = params["uid"];
        this.nativeStorage.getItem('user')
            .then(
              data => {
                console.log(data);
                if(!data){
                  this.navCtrl.push(LoginComponent);
                }else{          
                  this.userId=data.uid;
                  //console.log("profile user id value",this.userId);
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
  
    getShoppingList() {
      
      
    }

    updateUser() {
        // this.twilioService.updateUserDetails(this.userObj).subscribe(
        //     data=> {
        //         let response = JSON.parse((<any>data)._body);
        //         if (response.status == 200) {
        //             alert("saved successfully");
        //         }
        //     });;
    }

   
}