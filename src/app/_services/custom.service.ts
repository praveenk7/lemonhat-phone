import {NativeStorage} from '@ionic-native/native-storage';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType, } from '@ionic-native/contacts';

import { Network } from '@ionic-native/network';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


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

export class ContactsMock extends Contacts{
    find(fields: ContactFieldType[], options?: any): Promise<any[]> {
        return new Promise((reslove, reject)=>{
            reslove([
                {"_objectInstance":{"id":322,"rawId":null,"displayName":null,"name":{"givenName":"Praveen","formatted":"Praveen","middleName":null,"familyName":null,"honorificPrefix":null,"honorificSuffix":null},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"+91 9966076655","id":0,"pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},
                { "_objectInstance": { "id": 323, "rawId": null, "displayName": null, "name": { "givenName": "KaliCharan", "formatted": "KaliCharan", "middleName": null, "familyName": "iPhone 4", "honorificPrefix": null, "honorificSuffix": null }, "nickname": null, "phoneNumbers": [{ "type": "mobile", "value":"+91 7330558840","id":0,"pref":false}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null}
            ])
        })
    }
}


export class PushMock extends Push{

    // const options: PushOptions = {
    //     android: {},
    //     ios: {
    //         alert: 'true',
    //         badge: true,
    //         sound: 'false'
    //     },
    //     windows: {},
    //     browser: {
    //         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //     }
    //  };

    init(options: PushOptions): PushObject {
        let response: PushObject = new PushObject( options );
        return response;
    };


    hasPermission(): Promise<{isEnabled: boolean}> {
        let response={isEnabled:false};
        return new Promise((resolve, reject) => {
            resolve(response);
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