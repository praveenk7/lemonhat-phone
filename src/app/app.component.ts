import { Component } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform, AlertController } from 'ionic-angular';
import { LoginComponent } from './login.component';
import {TabsComponent} from './tabs/tabs.component';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import {userObj} from './user';
//import {}

@Component({    
    templateUrl: 'app.component.html'
})
export class AppComponent { 
    rootPage:any = TabsComponent;

    constructor(platform:Platform,
        push: Push,
        public alertCtrl: AlertController,
        private storage:Storage
        ) {
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
        //   statusBar.styleDefault();
        //   splashScreen.hide();
        const options: PushOptions = {
            //android: {},
            ios: {
                alert: "true",
                badge: "true",
                sound: "true",
                clearBadge:"true"                
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
         };
        const pushObject: PushObject = push.init(options);
        console.log("platform ready", platform._platforms);
        pushObject.on('registration').subscribe((data: any) => {
            console.log('device token -> ' + data.registrationId);
            this.storage.get('user').then((val) => {
            if(!val){
            userObj.deviceToken=data.registrationId;
            this.storage.set("user", userObj);
            }
            //TODO - send device token to server
            
          });
        });
        pushObject.on('notification').subscribe((notification: any) => 
        {
            console.log('Received a notification', notification)
            if (notification.additionalData.foreground) {
                // if application open, show popup
                let confirmAlert = this.alertCtrl.create({
                  title: 'New Notification',
                  message: notification.message,
                  buttons: [{
                    text: 'Ignore',
                    role: 'cancel'
                  }, {
                    text: 'View',
                    handler: () => {
                      //TODO: Your logic here
                      //this.nav.push(DetailsPage, { message: data.message });
                    }
                  }]
                });
                confirmAlert.present();
        };
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    });

    } 
}

      

