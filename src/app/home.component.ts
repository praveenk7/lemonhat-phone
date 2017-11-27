import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService} from './_services/twilio.service';
import * as $ from 'jquery';

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
    uid: any;
    constructor(private twilioService: TwilioService, private route: ActivatedRoute,
        private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.uid = params["uid"];
            
        });
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
        this.listName = "";
        //document.getElementById("channelModal").modal("show");
        //ionViewLoaded() {
        $("#channelModal").appendTo("body").modal("show");
        //}
    }

    saveChannel() {
        if (this.listName) {
            this.twilioService.createItemsList(this.listName, this.uid).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        this.subscribedChannels.push({ "itemsList": response.itemsList, "others": { "listName": this.listName, "channelType": "private", "createdDate": "", "createdBy": this.uid, "twilioChannelId": response.tChannelId } })
                        $("#channelModal").modal("hide");
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
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "uid": this.uid,
                "lid": itemsList,
                "lst": listName
            }
        };
        this.router.navigate(['item'], navigationExtras);
    }

    shareUsers(itemsList, tChannelId) {
         let navigationExtras: NavigationExtras = {
            queryParams: {
                "lid": itemsList,
                "tid": tChannelId,
                "uid": this.uid
            }
         };
        this.router.navigate(['share'], navigationExtras);
    }

//private addJoinedChannel(channel:Object){

//}

//private addInvitedChannel(channel:Object){

//}

//private addKnownChannel(channel:Object){

//}
}