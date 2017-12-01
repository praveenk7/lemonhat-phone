import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
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
        public nativeStorage: NativeStorage
        // private route: ActivatedRoute,
        // private router: Router, 
        // private location: Location
    ) {
        this.nativeStorage.getItem('user')
        .then(
          data => {
            console.log(data);
            if(!data){
              this.navCtrl.push(LoginComponent);
            }else{          
              this.uid=data.uid;
              console.log("uid value",this.uid);
            }
          },
          error => {
            console.log(error);
            this.navCtrl.push(LoginComponent);
          }
        );
       
    }    
    
    
    ngOnInit() {
        this.getChannels();
        
        
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
        //$("#channelModal").appendTo("body").modal("show");
        
    }

    saveChannel() {
         if (this.listName) {
             this.twilioService.createItemsList(this.listName, this.uid).subscribe(
                 data=> {
                     let response = JSON.parse((<any>data)._body);
                     if (response.status == 200) {
                         this.subscribedChannels.push({ "itemsList": response.itemsList, "others": { "listName": this.listName, "channelType": "private", "createdDate": "", "createdBy": this.uid, "twilioChannelId": response.tChannelId } })
                         this.loader.dismiss();
                         //$("#channelModal").appendTo("body").modal("hide");
                     }
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
             }
             )
    }

    showItems(itemsList, listName) {
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "uid": this.uid,
        //         "lid": itemsList,
        //         "lst": listName
        //     }
        // };
        // this.router.navigate(['item'], navigationExtras);
        this.navCtrl.push(ItemComponent, {
            "uid": this.uid,
            "lid": itemsList,
            "lst": listName
        });
    }

    shareUsers(itemsList, tChannelId) {
        //  let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         "lid": itemsList,
        //         "tid": tChannelId,
        //         "uid": this.uid
        //     }
        //  };
        // this.router.navigate(['share'], navigationExtras);
        
        this.navCtrl.push(ShareComponent, {
            "lid": itemsList,
            "tid": tChannelId,
            "uid": this.uid
        });
    }

    navigateBack() {
        //this.location.back(); // <-- go back to previous location on cancel
    }

    // ionViewCanEnter() {
    //     //console.log("enterr");    
    //     this.nativeStorage.getItem('user')
    //     .then(
    //       data => {
    //         console.log(data);
    //         if(!data){
    //           this.navCtrl.push(LoginComponent);
    //         }else{          
    //           this.uid=data.uid;
    //           console.log("uid value",this.uid);
    //         }
    //       },
    //       error => {
    //         console.log(error);
    //         this.navCtrl.push(LoginComponent);
    //       }
    //     );
    //     // return 
    //   }
}