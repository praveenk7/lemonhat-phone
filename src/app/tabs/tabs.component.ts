import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Nav, App  } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
// import { Network } from '@ionic-native/network';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';
import { LoginComponent } from '../login.component';
import { AddItemListComponent } from '../home/addItemList.component';
import { AddItemComponent } from '../items/addItem.component';
import {ItemComponent } from '../items/item.component';
import { DataProvider } from "../data";

@Component({
    templateUrl: 'tabs.component.html',
    styleUrls: ['./css/style.css']
})

export class TabsComponent {

    //tab1Root: any;
    //tab2Root: any;
    //tab3Root: any;
    //tab4Root: any;

    //isItemListPage: any = true;
    tabs: any = [
        { title: "Lists", root: HomeComponent, icon: "i-list-img-outline" },
        { title: "Add List", root: AddItemListComponent, icon: "i-add-img-outline" },
        { title: "Add Item", root: AddItemComponent, icon: "i-add-img-outline" },
        { title: "Profile", root: ProfileComponent, icon: "i-profile-img-outline" },
    ];
    uid: string;
    listElements: any;
    itemElements: any;
    constructor(
        private nativeStorage: NativeStorage,
        public navCtrl: NavController,
        private storage: Storage,
        public navParams: NavParams,
        public data: DataProvider,
        public nav: Nav,
        public app: App
        ) {
      
        this.app.viewWillEnter.subscribe(viewCtrl => {
            this.listElements = document.querySelectorAll(".tabbar a:nth-child(2)");
            this.itemElements = document.querySelectorAll(".tabbar a:nth-child(3)");
            let index;
            if (viewCtrl && viewCtrl.instance instanceof HomeComponent) {

                for (index = 0; index < this.listElements.length; index++) {
                    this.listElements[index].style.display = 'flex';
                    console.log(this.listElements[index]);
                }
                for (index = 0; index < this.itemElements.length; index++) {
                    this.itemElements[index].style.display = 'none';
                }
                //this.tabs = [
                //    { title: "Lists", root: HomeComponent, icon: "i-list-img-outline" },
                //    { title: "Add List", root: AddItemListComponent, icon: "i-add-img-outline" },
                //    { title: "Profile", root: ProfileComponent, icon: "i-profile-img-outline" },
                //];
                //this.isItemListPage = true;
            }

            else if (viewCtrl && viewCtrl.instance instanceof ItemComponent) {
                for (index = 0; index < this.listElements.length; index++) {
                    this.listElements[index].style.display = 'none';
                }

                for (index = 0; index < this.itemElements.length; index++) {
                    this.itemElements[index].style.display = 'flex';
                }

                //this.tabs = [
                //    { title: "Lists", root: HomeComponent, icon: "i-list-img-outline" },
                //    { title: "Add Item", root: AddItemComponent, icon: "i-add-img-outline" },
                //    { title: "Profile", root: ProfileComponent, icon: "i-profile-img-outline" },
                //];
                //this.isItemListPage = false;
            }
            console.log('Entering new view')
          console.log(viewCtrl)
      })
  };

   ngOnInit() {
   }  

  //Start Praveen change
  ionViewCanEnter() {
    //console.log("enterr");   
    this.storage.get('user').then((val) => {
      console.log("tabs user value", val);
      console.log("tabs documentUrl", document.URL);
        if (val && val.id){

     }else{
      this.navCtrl.push(LoginComponent);
     }
    });
     
  }

}
