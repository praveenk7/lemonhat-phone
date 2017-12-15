import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
// import { Network } from '@ionic-native/network';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';
import { LoginComponent } from '../login.component';
import { AddItemListComponent } from '../home/addItemList.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

    tab1Root = HomeComponent;
    tab2Root = AddItemListComponent;
    tab3Root = ProfileComponent;
    
  uid:string;

  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController,
    private storage: Storage      
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
  // //End
}
