import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
//import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService } from '../_services/twilio.service';
import { LoginComponent } from '../login.component';
import {ShareComponent } from '../share.component';
import {ItemComponent } from '../items/item.component';

//import * as $ from 'jquery';

//window["$"] = $;
//window["jQuery"] = $;
//import 'bootstrap';
declare var $: any;
@Component({    
    templateUrl: 'home.component.html',
    styleUrls: ['./login.component.css']
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
        private storage: Storage           
    ) {};
    
    
    ngOnInit() {        
        this.storage.get('user').then((val) => {
            console.log("tabs user value", val);
           if(val){
               this.uid = val;
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

    createChannel() {
        //in progress
        //this.listName = "";
         let prompt = this.alertCtrl.create({
             title: 'Create Shop List',
            //message: "Enter a name for this new album you're so keen on adding",
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
                         this.subscribedChannels.push({ "itemsList": response.itemsList, "others": { "listName": this.listName, "channelType": "private", "createdDate": "", "createdBy": this.uid, "twilioChannelId": response.tChannelId } })
                         //$("#channelModal").appendTo("body").modal("hide");
                     }
                     this.loader.dismiss();
                 }
                 )
             }
    }

    getChannels() {
         this.twilioService.getitemslist(this.uid).subscribe(
             data=> {
                     let response = JSON.parse((<any>data)._body);
                     if (response.status == 200) {
                         this.subscribedChannels = response.lst;
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

    shareUsers(itemsList, tChannelId) {       
        this.navCtrl.push(ShareComponent, {
            "lid": itemsList,
            "tid": tChannelId,
            "uid": this.uid
        });
    }

    navigateBack() {
        //this.location.back(); // <-- go back to previous location on cancel
    }   
}