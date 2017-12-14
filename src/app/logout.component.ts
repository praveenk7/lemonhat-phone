import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewController, NavController } from 'ionic-angular';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
    template: '<ion-list ><ion-list-header> Settings </ion-list-header><button ion-item (click)="viewProfile()"> My Account </button><button ion-item (click)="signOut()"> Sign out </button></ion-list>'
})
export class LogoutPopoverPage {
    constructor(public viewCtrl: ViewController, private storage: Storage, public navCtrl: NavController) { }

    close() {
        this.viewCtrl.dismiss();
    }

    viewProfile() {
        this.navCtrl.push(ProfileComponent);
    }

    signOut() {
        this.storage.remove('user').then((val) => {
            this.viewCtrl.dismiss();
            this.navCtrl.push(LoginComponent);
        });
    }
 
}