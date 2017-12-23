import { Component, OnInit } from '@angular/core';
import {TwilioService } from '../_services/twilio.service';
import { AlertController, LoadingController, NavParams } from 'ionic-angular';
import { DataProvider } from "../data";

@Component({   
    templateUrl: 'item.component.html',
    styleUrls: ['./css/style.css']
})
export class ItemComponent implements OnInit{
    listName: any;
    itemName: any ;
    itemsList: string;
    imageUrl: any;  
    uid: any;
    container: Object = {};
    isBought: Object = {};
    searchItemName: string = "";
    loader: any;
    items: any = [];
    constructor(private twilioService: TwilioService, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public data: DataProvider) {
        this.data.tabComponent = "item";
        this.itemsList = this.navParams.get('lid');
        this.uid = this.navParams.get('uid');
        this.listName = this.navParams.get('lst');
        this.loader = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loader.present();
        
    }
    
    
    ngOnInit() {
        this.getItems();
    }

    ionViewDidEnter() {
        if (this.data.paramData == "item") {
            this.getItems();
            this.data.paramData = "";
        }
        this.data.tabComponent = "item";
        this.data.itemListId = this.itemsList;
    }


    createItem() {
        
        this.itemName = "";
        
         let prompt = this.alertCtrl.create({
            title: 'Create Item',
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
                    }
                    this.loader.dismiss();
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
                this.loader.dismiss();
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
    }

    saveBought(itemData: any) {
        itemData.others.bought = itemData.others.bought ? false : true;
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.twilioService.updateBought(itemData).subscribe(
            data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {

                    }
                    this.loader.dismiss();
                
            }, error=> {
                itemData.others.bought = itemData.others.bought ? false : true;
                this.loader.dismiss();
                 let alert = this.alertCtrl.create({
                    subTitle: "Something went wrong. Please try again later.",
                    buttons: ['Ok']
                });
                alert.present();
            }
            )
    }

    updateQuantity(itemData: any, valueType: string) {
        if (!itemData.others.bought) {
            if (valueType == "decrement" && itemData.others.quantity > 1) {
                itemData.others.quantity = itemData.others.quantity - 1;
            } else if (valueType == "increment") {
                itemData.others.quantity = itemData.others.quantity + 1;
            }
            console.log(itemData.others.quantity);
            
                setTimeout(() => {
                    if (!itemData["isubmitted"]) {
                    //itemData["isubmitted"] = true;
                    this.saveQuantity(itemData);
                    alert("hit");
                    }
                }, 3000);
            
        }
    };

    saveQuantity(itemData) {
        this.twilioService.updateItemQuantity(itemData).subscribe(
            data=> {
                    let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                    itemData["isubmitted"] = false;
                }
                this.loader.dismiss();

            }, error=> {
                itemData["isubmitted"] = true;
                this.loader.dismiss();
                 let alert = this.alertCtrl.create({
                    subTitle: "Something went wrong. Please try again later.",
                    buttons: ['Ok']
                });
                alert.present();
                itemData["isubmitted"] = false;
            }
            )
    }
}