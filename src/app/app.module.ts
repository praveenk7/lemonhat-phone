﻿import { NgModule, ErrorHandler }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
//import * as $ from 'jquery';

// window["$"] = $;
// window["jQuery"] = $;

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//routing
//import {routing} from './app.routing';

//services
import {TwilioService} from './_services/twilio.service';
import {User} from './user';
//components
 import { AppComponent }  from './app.component';
 import { LoginComponent }  from './login.component';
 import { TabsComponent} from './tabs/tabs.component';
 import { HomeComponent }  from './home/home.component';
 import {VerifyPhone } from './phone.verify.component';
 import{ProfileComponent } from './profile/profile.component';
// import{ ItemComponent } from './item.component';
// import { ShareComponent } from './share.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        //routing,
        IonicModule.forRoot(AppComponent)
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TabsComponent,
        VerifyPhone,
        HomeComponent,
        // ItemComponent,
        // ShareComponent,
         ProfileComponent     
    ],
    providers: [ 
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler,},
        NativeStorage,
        TwilioService,
        User    
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        LoginComponent,
        VerifyPhone,
        TabsComponent,        
        HomeComponent,
        // ItemComponent,
        // ShareComponent,
         ProfileComponent
    ]
})

export class AppModule { }