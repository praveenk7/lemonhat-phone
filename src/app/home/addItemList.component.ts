import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import {TwilioService } from '../_services/twilio.service';
import { LoginComponent } from '../login.component';
import {HomeComponent } from '../home/home.component';
import {LogoutPopoverPage } from '../logout.component';


@Component({    
    templateUrl: 'addItemList.component.html',
    styleUrls: ['./css/style.css']
})
export class AddItemListComponent implements OnInit{

    listName: any ;
    twilioToken: string;
    client: any;  
    uid: string //= "AV_9IGx-OEwIORfq8zsq";
    loader: any;
    subscribedChannels: any;
    searchListName: string = "";
    constructor(private twilioService: TwilioService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public nativeStorage: NativeStorage,
        private storage: Storage,
        public popoverCtrl: PopoverController        
        ) {
        //this.storage.remove('user')
    };
    
    
    ngOnInit() {        
        this.storage.get('user').then((val) => {
            console.log("tabs user value", val);
           if(val){
               this.uid = val.id;
            //   this.loader = this.loadingCtrl.create({
            //       content: "Loading...",
            //   });
            //   this.loader.present();
            //console.log("home uid value",val);
            //this.getChannels();
           }else{
            this.navCtrl.push(LoginComponent);
           }
          });
        
    }  


    createChannel() {
         let prompt = this.alertCtrl.create({
             title: 'Create Shop List',
            inputs: [
                {
                    name: 'listName',
                    placeholder: 'List Name'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.listName = data.listName;
                        if (this.listName) {
                        this.loader = this.loadingCtrl.create({
                                content: "Please wait...",
                            });
                            this.loader.present();
                            this.saveChannel();
                        }
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    saveChannel() {
         if (this.listName) {
             this.twilioService.createItemsList(this.listName, this.uid).subscribe(
                 data=> {
                     let response = JSON.parse((<any>data)._body);
                     if (response.status == 200) {
                         this.navCtrl.push(HomeComponent, { });
                        // this.subscribedChannels.push({ "itemsList": response.itemsList, "others": { "listName": this.listName, "channelType": "private", "createdDate": "", "createdBy": this.uid, "twilioChannelId": response.tChannelId } })
                     }
                     else {
                        let alert = this.alertCtrl.create({
                             subTitle: "Something went wrong. Please try again later.",
                             buttons: ['Ok']
                         });
                         alert.present();
                     }
                     this.loader.dismiss();
                 }
                 )
             }
    }

    //getChannels() {
    //     this.twilioService.getitemslist(this.uid).subscribe(
    //         data=> {
    //                 let response = JSON.parse((<any>data)._body);
    //                 if (response.status == 200) {
    //                     this.subscribedChannels = response.lst;
    //                 }
    //             this.loader.dismiss();
    //         }
    //         )
    //}


    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LogoutPopoverPage);
        popover.present({
            ev: myEvent
        });
    }  
}