import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
// import { Network } from '@ionic-native/network';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';
import { LoginComponent} from '../login.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  tab1Root = HomeComponent;
  tab2Root = ProfileComponent;
  uid:string;

  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController    
   ) {      
     
  }

  //Start Praveen change
  ionViewCanEnter() {
    //console.log("enterr");   
   
    this.nativeStorage.getItem('user')
    .then(
      data => {
        console.log(data);
        if(!data){
          this.navCtrl.push(LoginComponent);
        }else{          
          this.uid=data.uid;
          console.log(this.uid);
        }
      },
      error => {
        console.log(error);
        this.navCtrl.push(LoginComponent);
      }
    );
    // return 
  }
  //End
}
