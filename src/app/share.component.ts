import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {TwilioService } from './_services/twilio.service';
import { NavParams, LoadingController } from 'ionic-angular';
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
    allContacts: any;
    //allUsers: any;
    constructor(private twilioService: TwilioService,
        public navParams: NavParams,
        private contacts: Contacts,
        public loadingCtrl: LoadingController        
        ) {

        this.itemsList = this.navParams.get('lid');
        this.tChannelId = this.navParams.get('tid');
        this.uid = this.navParams.get('uid');
        this.loader = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loader.present();
    }

    ngOnInit() {
        //this.getAllUser();
        this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
        .then(data => {
            //console.log(data);
            this.allContacts = data;
            this.loader.dismiss();
        });

        // this.contacts.pickContact().then((result)=>{
        //     console.log("phone contacts", result);
        // })
    }
    allUsers: any = [];
    getAllUser() {
        this.twilioService.getAllUser(this.uid).subscribe(
            data=> {
                     let users = JSON.parse((<any>data)._body);
                this.allUsers = users.usr;
                this.loader.dismiss();
            });
    }


    shareListToUsers() {
        let shareUsersList = { "sharedTo": [], "phone": [] };
        let phone = "";
        for (var i = 0; i < this.allContacts.length; i++) {
            if (this.allContacts[i]['isChecked' + i]) {
                phone = this.allContacts[i]._objectInstance.phoneNumbers.length > 0 ? this.allContacts[i]._objectInstance.phoneNumbers[0].value : "";
                shareUsersList.sharedTo.push({ "name": this.allContacts[i]._objectInstance.name.givenName, "phone": phone });
                shareUsersList.phone.push(phone);
            }
        }
        //if (shareUsersList && shareUsersList.length > 0) {
        //    this.twilioService.shareListtoUsers(this.itemsList, shareUsersList, this.tChannelId).subscribe(
        //        data=> {
        //        let response = JSON.parse((<any>data)._body);
        //            if (response.status == 200) {
        //                alert("saved successfully");
        //            }
        //        });
        //}
    }

    //navigateBack() {
    //    //this.location.back(); // <-- go back to previous location on cancel
    //}

}