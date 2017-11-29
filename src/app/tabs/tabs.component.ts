import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomeComponent } from '../home/home.component';
import { ProfileComponent} from '../profile/profile.component';

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
  // ionViewCanEnter() {
  //   console.log("enterr");
  //   this.nativeStorage.getItem('token')
  //   .then(
  //     data => {console.log(data)        
  //     },
  //     error => console.error(error)
  //   );
  //   // return 
  // }
  //End
}
