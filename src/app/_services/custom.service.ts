// import { NgModule, ErrorHandler }      from '@angular/core';
// import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';


import { Network } from '@ionic-native/network';



export class NativeStorageMock extends NativeStorage {
    
    setItem(reference: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    };
    
    getItem(reference: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({"token":"", "uid":"AV_9IGx-OEwIORfq8zsq"});
        });
    };
}


// export class AppProviders {
//     constructor(public platform:Platform) {
//         let df=platform._platforms;
//         console.log("platform source", df);
//     }
       
//        //static devicePlatform:Platform;
//        //pf:Platform;
//     //    public checkios() {
//     //     let pf=new Platform()._platforms;
//     //    }

//        public static getProviders() {
//          //let pf=new Platform()._platforms;
//         //   pf.ready().then((source) => {
//         //             console.log("platform source " + source);
//         //   }).catch((error)=>{
//         //     console.log("platform source " + error);
//         //   });
//           //console.log("platformmmmmmmmm",);
//            let providers;
//            //if(Platform.)
         
//         //    if(document.URL.includes('https://') || document.URL.includes('http://')){

//         //      // Use browser providers
//         //     providers= [ 
//         //         StatusBar,
//         //         SplashScreen,
//         //         {provide: ErrorHandler, useClass: IonicErrorHandler,},
//         //         NativeStorage,
//         //         TwilioService,
//         //         User    
//         //     ]
    
//         //    } else {
    
//              // Use device providers
//              providers= [ 
//                 StatusBar,
//                 SplashScreen,
//                 {provide: ErrorHandler, useClass: IonicErrorHandler,},
//                 {provide: NativeStorage, useClass: NativeStorageMock,},
//                 TwilioService,
//                 User    
//             ]
    
//            //}
    
//            return providers;
    
//        }
    
//    }