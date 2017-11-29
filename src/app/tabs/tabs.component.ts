import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';
import { LoginComponent} from '../login.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  tab1Root = HomeComponent;
  tab2Root = ProfileComponent;
  

  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController) {

  }

  //Start Praveen change
  ionViewCanEnter() {
    console.log("enterr");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        console.log(data);
        if(!data){
          this.navCtrl.push(LoginComponent);
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
