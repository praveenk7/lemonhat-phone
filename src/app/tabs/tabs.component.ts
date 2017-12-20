import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
// import { Network } from '@ionic-native/network';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';
import { LoginComponent } from '../login.component';
import { AddItemListComponent } from '../home/addItemList.component';
import { AddItemComponent } from '../items/addItem.component';
import { DataProvider } from "../data";

@Component({
    templateUrl: 'tabs.component.html',
    styleUrls: ['./css/style.css']
})

export class TabsComponent {
    //@ViewChild('mainTabs') mainTabs: Tabs;
    tab1Root = HomeComponent;
    tab2Root = AddItemListComponent;
    tab3Root = AddItemComponent;
    tab4Root = ProfileComponent;
    
  uid:string;

  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController,
    private storage: Storage,
      public navParams: NavParams,
      public data: DataProvider     
   ) {};

   ngOnInit() {
   }  

  //Start Praveen change
  ionViewCanEnter() {
    //console.log("enterr");   
    this.storage.get('user').then((val) => {
      console.log("tabs user value", val);
      console.log("tabs documentUrl", document.URL);
     if(val){

     }else{
      this.navCtrl.push(LoginComponent);
     }
    });
     
  }

    //tapped() {
    ////let selectedTab = this.mainTabs._selectHistory;

    //    let name = this.data.tabComponent;
    //    if (this.data.tabComponent == "item") {
    //        //this.tab2Root = AddItemComponent;
    //    } else {
    //        //this.tab2Root = AddItemListComponent;
    //    }
    //    //console.log(selectedTab.index + ' - ' + selectedTab.tabTitle);
    //}

    //ionViewDidEnter() {
    //    alert(this.navCtrl);
    //    //.parent.getSelected().index
    //   // this.navParams.data = { "isAddTab": false };
    //}
  // //End
}
