import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts} from '@ionic-native/contacts';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
//services
import {TwilioService} from './_services/twilio.service';
import {ContactsMock, PushMock, NativeStorageMock} from './_services/custom.service';
import {User} from './user';
//components
 import { AppComponent }  from './app.component';
 import { LoginComponent }  from './login.component';
 import { TabsComponent} from './tabs/tabs.component';
 import { HomeComponent }  from './home/home.component';
 import { VerifyPhone } from './phone.verify.component';
 import { ProfileComponent } from './profile/profile.component';
 import { ItemComponent } from './items/item.component';
 import { ShareComponent } from './share.component';
import { FilterPipe } from './filter.pipe';
import { LogoutPopoverPage } from './logout.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        //routing,
        IonicModule.forRoot(AppComponent),
        IonicStorageModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        TabsComponent,
        VerifyPhone,
        HomeComponent,       
        ProfileComponent,
        ItemComponent,
        ShareComponent,        
        FilterPipe,
        LogoutPopoverPage
    ],
    providers: AppModule.getProviders(),
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        LoginComponent,
        VerifyPhone,
        TabsComponent,        
        HomeComponent,
        ItemComponent,
        ShareComponent,
        ProfileComponent,
        LogoutPopoverPage
    ]
})

//@Injectable()
export class AppModule {   
    
    public static getProviders() {
      
      
          let providers;
         
        console.log("documentUrl", document.URL);
         if(document.URL.includes('Bundle')){
            console.log("device providers")
            //Use device providers
           providers= [ 
                   StatusBar,
                   SplashScreen,
                   {provide: ErrorHandler, useClass: IonicErrorHandler,},
                   NativeStorage,
                   IonicStorageModule,
                   Contacts,
                   Push,                   
                   TwilioService,
                   User    
           ]        
          } else {
            console.log("browser providers")
            // Use browser providers
           providers= [ 
               StatusBar,
               SplashScreen,
               {provide: ErrorHandler, useClass: IonicErrorHandler,},
               {provide: NativeStorage, useClass: NativeStorageMock,},
               IonicStorageModule,
               {provide:Contacts, useClass:ContactsMock},
               {provide: Push, useClass: PushMock},
               TwilioService,
               User    
           ]
   
          }  
        
          return providers;
   
      }
   
 }