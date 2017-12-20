import { Component, OnInit } from '@angular/core';
import {TwilioService } from '../_services/twilio.service';
import { Storage } from '@ionic/storage';
import { LoginComponent } from '../login.component';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../data";

@Component({   
    templateUrl: 'addItem.component.html',
    styleUrls: ['./css/style.css']
})
export class AddItemComponent implements OnInit{
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
        public navCtrl: NavController,
        public navParams: NavParams,
        public data: DataProvider,
        private storage: Storage) {
       
        
    }
    
    items:any;
    ngOnInit() {
        this.storage.get('user').then((val) => {
            console.log("tabs user value", val);
            if (val) {
                this.uid = val.id;
            } else {
                this.navCtrl.push(LoginComponent);
            }
        });
    }

    ionViewDidEnter() {
        this.itemsList = this.data.itemListId;
        this.itemName = "";
    }

    saveItem() {
        if (this.itemName && this.itemsList) {
            this.loader = this.loadingCtrl.create({
                content: "Loading...",
            });
            this.loader.present();
            this.twilioService.createItem(this.itemsList, this.uid, this.itemName).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        this.data.itemListId = "";
                        this.data.paramData = "item";
                        this.navCtrl.parent.select(0);
                        //this.items.push({ "item": response.item, "others": { "itemName": this.itemName, "createdDate": "", "createdBy": this.uid, "itemListId": this.itemsList } })
                    }
                    this.loader.dismiss();
                }
                )
            }
    }

   

    openChart(event: Object, item: number, cont: boolean) {
        this.container[item] = cont ? cont : false;
        if (!this.container[item]) {
            this.container[item] = true;
        } else {
            this.container[item] = false;
        }
    }
}