import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService } from './_services/twilio.service';
import {User } from './user';

//declare const Fingerprint2: any;
//declare const Twilio: any;

@Component({  
    templateUrl: 'profile.component.html',
    styleUrls: ['./login.component.css']
})
export class ProfileComponent{
    userId: any = "";
    constructor(private twilioService: TwilioService,
        private route: ActivatedRoute,
        private router: Router,
        private userObj: User) {
        this.route.queryParams.subscribe(params => {
            this.userId = params["uid"];
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
        });
         }
  
    getShoppingList() {
         let navigationExtras: NavigationExtras = {
            queryParams: {
                "uid": this.userObj.id,
            }
         };
        this.router.navigate(['home'], navigationExtras);

        //get twilio token
        //new Fingerprint2().get((result, components) => {
        //    this.twilioService.getToken(this.userObj.phone, result).subscribe(
        //        data=> {
        //            this.twilioToken = data._body;
        //            this.client = new Twilio.Chat.Client(data._body, { logLevel: 'debug' });
        //            this.twilioService.setTwilioClient(this.client);
        //            this.router.navigate(['home'], navigationExtras);
        //        }
        //        )
        //      });
    }

    updateUser() {
        this.twilioService.updateUserDetails(this.userObj).subscribe(
            data=> {
                let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                    alert("saved seccessfully");
                }
            });;
    }
}