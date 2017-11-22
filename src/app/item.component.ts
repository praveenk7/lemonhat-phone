import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {TwilioService} from './_services/twilio.service';

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
    constructor(private twilioService: TwilioService, private route: ActivatedRoute,
        private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.itemsList = params["lid"];
            this.uid = params["uid"];
            this.listName = params["lst"]
        });
    }
    
    //channelList:string[];
    items:any;
    ngOnInit() {
        this.getItems();
    }


    createItem() {
        //in progress
        this.itemName = "";
        $("#itemModal").modal("show");
    }

    saveItem() {
        this.twilioService.createItem(this.itemsList,this.uid,this.itemName).subscribe(
            data=> {
                    let response = JSON.parse(data._body);
                if (response.status == 200) {
                    this.items.push({ "item": response.item, "others": { "itemName": this.itemName, "createdDate": "", "createdBy": this.uid, "itemListId": this.itemsList } })
                        $("#itemModal").modal("hide");
                    }
            }
            )
    }

    getItems() {
        this.twilioService.getitems(this.itemsList).subscribe(
            data=> {
                    let response = JSON.parse(data._body);
                    if (response.status == 200) {
                        this.items = response.items;
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

private addJoinedChannel(channel:Object){

}

private addInvitedChannel(channel:Object){

}

private addKnownChannel(channel:Object){

}
}