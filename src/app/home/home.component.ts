import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService } from '../_services/twilio.service';
import { AlertController, LoadingController } from 'ionic-angular';
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
    uid: any = "AV_9tkw_OEwIORfq8zsz";
    loader: any;
    constructor(private twilioService: TwilioService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
        // private route: ActivatedRoute,
        // private router: Router, 
        // private location: Location
    ) {
        // this.route.queryParams.subscribe(params => {
        //     this.uid = params["uid"];
            
        // });
    }
    
    //channelList:string[];
    subscribedChannels:any;
    ngOnInit() {
        this.getChannels();
        //this.loadChannels();//load chat lists
        //new Fingerprint2().get((result, components) => {
        //    this.twilioService.getToken(this.channelName, result).subscribe(
        //        data=> {
        //            this.twilioToken = data._body;
        //            this.client = new Twilio.Chat.Client(data._body, { logLevel: 'debug' });
        //            this.twilioService.setTwilioClient(this.client);
                    
        //        }
        //        )
        //      });
        
        
    }

    //    private loadChannels(){
    //        this.client=this.twilioService.getTwilioClient();
    //       this.client.getSubscribedChannels().then(
    //            channelList => {
    //                this.subscribedChannels = channelList.items.sort(function(a, b) {
    //                    return a.friendlyName > b.friendlyName;
    //                  })

    //                  this.subscribedChannels.forEach(channel=>{
    //                    switch (channel.status) {
    //                      case 'joined':
    //                        this.addJoinedChannel(channel);
    //                        break;
    //                      case 'invited':
    //                        this.addInvitedChannel(channel);
    //                        break;
    //                      default:
    //                        this.addKnownChannel(channel);
    //                        break;

    //    }
    //})

    //})
    //}

    createChannel() {
        //in progress
        //this.listName = "";
         let prompt = this.alertCtrl.create({
            title: 'Create ItemList',
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
    }

    navigateBack() {
        //this.location.back(); // <-- go back to previous location on cancel
    }


}