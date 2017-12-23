import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import {TwilioService } from '../_services/twilio.service';
import { LoginComponent } from '../login.component';
import {ShareComponent } from '../share.component';
import {ItemComponent } from '../items/item.component';
import {LogoutPopoverPage } from '../logout.component';
import { DataProvider } from "../data";


@Component({    
    templateUrl: 'home.component.html',
    styleUrls: ['./css/style.css']
})
export class HomeComponent implements OnInit{

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
        public popoverCtrl: PopoverController,
        public data: DataProvider      
        ) {  
        this.data.tabComponent = "home";
          };
    
    
    ngOnInit() {  
        
        this.storage.get('user').then((val) => {
            console.log("tabs user value", val);
           if(val){
               this.uid = val.id;
               this.loader = this.loadingCtrl.create({
                   content: "Loading...",
               });
               this.loader.present();
            console.log("home uid value",val);
            this.getChannels();
           }else{
            this.navCtrl.push(LoginComponent);
           }
          });
        
    }  

    ionViewDidEnter() {
        console.log('ionViewDidLoad tab1Page');
        console.log(this.data.paramData);
        if (this.data.paramData == "itemList") {
            this.getChannels();
            this.data.paramData = "";
        }
        this.data.tabComponent = "home";
    }

    //createChannel() {
    //     let prompt = this.alertCtrl.create({
    //         title: 'Create Shop List',
    //        inputs: [
    //            {
    //                name: 'listName',
    //                placeholder: 'List Name'
    //            },
    //        ],
    //        buttons: [
    //            {
    //                text: 'Cancel',
    //                handler: data => {
    //                    console.log('Cancel clicked');
    //                }
    //            },
    //            {
    //                text: 'Save',
    //                handler: data => {
    //                    this.listName = data.listName;
    //                    if (this.listName) {
    //                    this.loader = this.loadingCtrl.create({
    //                            content: "Please wait...",
    //                        });
    //                        this.loader.present();
    //                        this.saveChannel();
    //                    }
    //                    console.log('Saved clicked');
    //                }
    //            }
    //        ]
    //    });
    //    prompt.present();
    //}

    //saveChannel() {
    //     if (this.listName) {
    //         this.twilioService.createItemsList(this.listName, this.uid).subscribe(
    //             data=> {
    //                 let response = JSON.parse((<any>data)._body);
    //                 if (response.status == 200) {
    //                     this.subscribedChannels.push({ "itemsList": response.itemsList, "others": { "listName": this.listName, "channelType": "private", "createdDate": "", "createdBy": this.uid, "twilioChannelId": response.tChannelId } })
    //                 }
    //                 else {
    //                    let alert = this.alertCtrl.create({
    //                         subTitle: "Something went wrong. Please try again later.",
    //                         buttons: ['Ok']
    //                     });
    //                     alert.present();
    //                 }
    //                 this.loader.dismiss();
    //             }
    //             )
    //         }
    //}

    getChannels() {
         this.twilioService.getitemslist(this.uid).subscribe(
             data=> {
                     let response = JSON.parse((<any>data)._body);
                 if (response.status == 200) {
                     this.subscribedChannels = response.lst;
                     //[{ "itemsList": "AWB3qtnxOEwIORfq8zwb", "others": { "listName": "1st week list", "createdDate": "2017-12-21T06:02:53.584Z", "createdBy": "hauup4kjbg2ny2u", "sharedTo": [] } }, { "itemsList": "AWB4hISOOEwIORfq8zwn", "others": { "listName": "2nd list", "createdDate": "2017-12-21T10:00:38.561Z", "createdBy": "hauup4kjbg2ny2u" } }];
                 }
                 this.loader.dismiss();
             }
             )
    }

    showItems(itemsList, listName) {      
        this.navCtrl.push(ItemComponent, {
            "uid": this.uid,
            "lid": itemsList,
            "lst": listName
        });
    }

    shareToUsers(itemsList, itemListName) {       
        this.navCtrl.push(ShareComponent, {
            "lid": itemsList,
            "uid": this.uid,
            "lstName": itemListName
        });
    }

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LogoutPopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    deleteItemList(itemsList,index) {
        if (itemsList) {
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
            });
            this.loader.present();
            //this.subscribedChannels.splice(index, 1);
            this.twilioService.archieveItemsList(itemsList, this.uid).subscribe(
                data=> {
                     let response = JSON.parse((<any>data)._body);
                    if (response && response.status == 200) {
                        this.subscribedChannels.splice(index, 1);
                    }
                    else {
                        let alert = this.alertCtrl.create({
                            subTitle: "Something went wrong. Please try again later.",
                            buttons: ['Ok']
                        });
                        alert.present();
                    }
                    this.loader.dismiss();
                },
                error=> {
                    this.loader.dismiss();
                     let alert = this.alertCtrl.create({
                        subTitle: "Something went wrong. Please try again later.",
                        buttons: ['Ok']
                    });
                    alert.present();
                }
                )
            }
    }  
}