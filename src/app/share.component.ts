import { Component, OnInit } from '@angular/core';
//import { Location } from '@angular/common';
//import {  ActivatedRoute } from "@angular/router";
import {TwilioService } from './_services/twilio.service';
import { NavParams, LoadingController } from 'ionic-angular';
//import { filter } from './filter.pipe';
//import {User } from './user';

//declare const Fingerprint2: any;
//declare const Twilio: any;

@Component({   
    templateUrl: 'share.component.html',
    styleUrls: ['./login.component.css']
})
export class ShareComponent implements OnInit{
    itemsList: any = "";
    tChannelId: any = "";
    uid: any = "";
    myInput: string = "";
    loader: any;
    //allUsers: any;
    constructor(private twilioService: TwilioService,
        public navParams: NavParams,
        public loadingCtrl: LoadingController
        //private route: ActivatedRoute, private location: Location
        ) {

        this.itemsList = this.navParams.get('lid');
        this.tChannelId = this.navParams.get('tid');
        this.uid = this.navParams.get('uid');
        this.loader = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loader.present();
        //this.route.queryParams.subscribe(params => {
        //    this.itemsList = params["lid"];
        //    this.tChannelId = params["tid"];
        //    this.uid = params["uid"];
        //});
    }

    ngOnInit() {
        this.getAllUser();
    }
    allUsers: any = [];
    //[{ "usr": "AV_ZMHEeff7q3U-PKsyB", "others": { "phone": "7330558840", "countryCode": "91", "chatToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3LTE1MTExNzczNTEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJBVl9aTUhFZWZmN3EzVS1QS3N5QiIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3IiwiZW5kcG9pbnRfaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3QVZfWk1IRWVmZjdxM1UtUEtzeUJicm93c2VyIiwicHVzaF9jcmVkZW50aWFsX3NpZCI6IkNSZTljNWVmZjI5ZTc0NDcwOWQ3ZGY4NzVmOGE3OTdiZjAifX0sImlhdCI6MTUxMTE3NzM1MSwiZXhwIjoxNTExMjE3MzUxLCJpc3MiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3Iiwic3ViIjoiQUMwMzI2OGYxZTEwYTgzNTE4OTUwODJhMmQwNWQzZjVlMCJ9.INw9XrlqZhlhv-v-JyHVbTSn7BgjWTjJLrQmVPeguJs", "userName": "kali", "email": "kalicharan5782gmail.com" } },
    //    { "usr": "AV_ZrNUcff7q3U-PKsyP", "others": { "phone": "9966076655", "countryCode": "91", "chatToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3LTE1MTExODU1MDMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJBVl9ack5VY2ZmN3EzVS1QS3N5UCIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3IiwiZW5kcG9pbnRfaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3QVZfWnJOVWNmZjdxM1UtUEtzeVBicm93c2VyIiwicHVzaF9jcmVkZW50aWFsX3NpZCI6IkNSZTljNWVmZjI5ZTc0NDcwOWQ3ZGY4NzVmOGE3OTdiZjAifX0sImlhdCI6MTUxMTE4NTUwMywiZXhwIjoxNTExMjI1NTAzLCJpc3MiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3Iiwic3ViIjoiQUMwMzI2OGYxZTEwYTgzNTE4OTUwODJhMmQwNWQzZjVlMCJ9.uoidf0peM_4rjSK-TQhVPgMjcNtpgjz21QtoemwRoL4", "userName": "praveen", "email": "praveen.k7@gmail.com" } },
    //    { "usr": "AV_Zr-oHff7q3U-PKsyQ", "others": { "phone": "7330558840", "countryCode": "91", "chatToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3LTE1MTExODU3MDUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJBVl9aci1vSGZmN3EzVS1QS3N5USIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3IiwiZW5kcG9pbnRfaWQiOiJJUzQxODU2MTIwZTQwODRjZTE5MmY5MTc2ZWJjNjcwNWM3QVZfWnItb0hmZjdxM1UtUEtzeVFicm93c2VyIiwicHVzaF9jcmVkZW50aWFsX3NpZCI6IkNSZTljNWVmZjI5ZTc0NDcwOWQ3ZGY4NzVmOGE3OTdiZjAifX0sImlhdCI6MTUxMTE4NTcwNSwiZXhwIjoxNTExMjI1NzA1LCJpc3MiOiJTSzNlNWE5MGUzMmJhYzQxNmQyMWEyNDczYTQ2OTEzODc3Iiwic3ViIjoiQUMwMzI2OGYxZTEwYTgzNTE4OTUwODJhMmQwNWQzZjVlMCJ9.hMaPzmnGJvqBHM73w7bdAPxP4pgUhJqLBLTQRXXj-kY" } }];

    getAllUser() {
        this.twilioService.getAllUser(this.uid).subscribe(
            data=> {
                     let users = JSON.parse((<any>data)._body);
                this.allUsers = users.usr;
                this.loader.dismiss();
            });
    }


    shareListToUsers() {
        let shareUsersList = [];
        for (var i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i]['isChecked' + i]) {
                shareUsersList.push({ "uid": this.allUsers[i].usr });
            }
        }
        if (shareUsersList && shareUsersList.length > 0) {
            this.twilioService.shareListtoUsers(this.itemsList, shareUsersList, this.tChannelId).subscribe(
                data=> {
                let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        alert("saved successfully");
                    }
                });
        }
    }

    navigateBack() {
        //this.location.back(); // <-- go back to previous location on cancel
    }

}