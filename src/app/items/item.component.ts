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
    txtMessage: Object = {};
    searchItemName: string = "";
    loader: any;
    items: any = [];
    constructor(private twilioService: TwilioService, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public data: DataProvider) {
        //this.data.tabComponent = "item";
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
            this.searchItemChange()
            this.getItems();
            this.data.paramData = "";
        }
        //this.data.tabComponent = "item";
        this.data.itemListId = this.itemsList;
    }

    doRefresh(refresher) {
        this.searchItemChange();
        this.getItems();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

    searchItemChange() {
        this.container = {};
        this.txtMessage = {};
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
            },
            error=> {
                this.loader.dismiss();
            }
            )
    }

    openChart(item: number, cont: boolean) {
        this.container[item] = cont ? cont : false;
        if (!this.container[item]) {
            this.container[item] = true;
        } else {
            this.container[item] = false;
        }
    }

    saveBought(itemData: any){
        console.log("before bought" + itemData.others.bought)
        let isBought;
        if (!itemData.others.bought) {
            isBought = itemData.others.bought ? false : true;
            console.log("after bought" + itemData.others.bought)
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
            });
            this.loader.present();
            this.twilioService.updateBought(itemData, isBought).subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        itemData.others.bought = isBought;
                    }
                    this.loader.dismiss();

                }, error=> {
                    //itemData.others.bought = itemData.others.bought ? false : true;
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

updateQuantity(itemData:any, valueType:any) {
        let quantity = 0;
    if (!itemData.others.bought) {
        if (valueType == "decrement" && itemData.others.quantity == 1) {
            return false;
        } if (valueType == "decrement" && itemData.others.quantity > 1) {
            quantity = itemData.others.quantity - 1;
        } else if (valueType == "increment") {
            quantity = itemData.others.quantity + 1;
        } else {
            quantity = itemData.others.quantity;
        }
        console.log(quantity);
        if (quantity >= 1) {
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
            });
            this.loader.present();
            //setTimeout(() => {
            //    if (!itemData["isubmitted"]) {
            this.saveQuantity(itemData, valueType, quantity);
            // itemData["isubmitted"] = true;
            //alert("hit");
            //    }
            //}, 3000);
        }

    }
}

    saveQuantity(itemData:any, valueType:any, quantity:any) {
        this.twilioService.updateItemQuantity(itemData, quantity).subscribe(
            data=> {
                    let response = JSON.parse((<any>data)._body);
                if (response.status == 200) {
                     itemData.others.quantity = quantity;
                    //itemData["isubmitted"] = false;
                }
                this.loader.dismiss();

            }, error=> {
                //itemData["isubmitted"] = true;
                //if (valueType == "decrement" && itemData.others.quantity!=1) {
                //    itemData.others.quantity = itemData.others.quantity + 1;
                //} else if (valueType == "increment") {
                //    itemData.others.quantity = itemData.others.quantity - 1;
                //}
                this.loader.dismiss();
                 let alert = this.alertCtrl.create({
                    subTitle: "Something went wrong. Please try again later.",
                    buttons: ['Ok']
                });
                alert.present();
                //itemData["isubmitted"] = false;
            }
            )
    }

    sendMessageForItem(itemData: any, index: any) {
        if (this.txtMessage[index]) {
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
            });
            this.loader.present();
            this.twilioService.sendMessage(itemData.item, this.txtMessage[index], this.itemsList, this.uid, "chat").subscribe(
                data=> {
                    let response = JSON.parse((<any>data)._body);
                    if (response.status == 200) {
                        alert("message send");
                        this.txtMessage[index] = "";
                    }
                    this.loader.dismiss();
                },
                error=> {
                    this.loader.dismiss();
                }
                )
            }
    }
}