import { Component, OnInit } from '@angular/core';
//import { Location } from '@angular/common';
//import {  ActivatedRoute } from "@angular/router";
import {TwilioService } from '../_services/twilio.service';
import { AlertController, LoadingController, NavParams } from 'ionic-angular';
//import * as $ from 'jquery';
//declare var $: any;

@Component({   
    templateUrl: 'item.component.html',
    styleUrls: ['./login.component.css']
})
export class ItemComponent implements OnInit{
    listName: any;
    itemName: any ;
    itemsList: string;
    imageUrl: any;  
    uid: any;
    container: Object = {};
    searchItemName: string = "";
    loader: any;
    constructor(private twilioService: TwilioService, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams) {
        this.itemsList = this.navParams.get('lid');
        this.uid = this.navParams.get('uid');
        this.listName = this.navParams.get('lst');

        //this.route.queryParams.subscribe(params => {
        //    this.itemsList = params["lid"];
        //    this.uid = params["uid"];
        //    this.listName = params["lst"]
        //});
    }
    
    //channelList:string[];
    items:any;
    ngOnInit() {
        this.getItems();
    }


    createItem() {
        //in progress
        this.itemName = "";
        //$("#itemModal").appendTo("body").modal("show");
         let prompt = this.alertCtrl.create({
            title: 'Create Item',
            //message: "Enter a name for this new album you're so keen on adding",
            inputs: [
                {
                    name: 'itemName',
                    placeholder: 'Item Name'
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
                        this.itemName = data.itemName;
                        if (this.itemName) {
                            this.loader = this.loadingCtrl.create({
                                content: "Please wait...",
                            });
                            this.loader.present();
                            this.saveItem();
                        }
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    saveItem() {
        if (this.itemName) {
            this.twilioService.createItem(this.itemsList, this.uid, this.itemName).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        this.items.push({ "item": response.item, "others": { "itemName": this.itemName, "createdDate": "", "createdBy": this.uid, "itemListId": this.itemsList } })
                        //$("#itemModal").appendTo("body").modal("hide");
                        this.loader.dismiss();
                    }
                }
                )
            }
    }

    getItems() {
        this.twilioService.getitems(this.itemsList).subscribe(
            data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        this.items = response.items ? response.items : [];
                    }
            }
            )
    }

    openChart(event: Object, item: number, cont: boolean) {
        this.container[item] = cont ? cont : false;
        if (!this.container[item]) {
            this.container[item] = true;
        } else {
            this.container[item] = false;
        }

        //alert('Open ');
    }

    navigateBack() {
        //this.location.back(); // <-- go back to previous location on cancel
    }


}