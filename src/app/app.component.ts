import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import {TabsComponent} from './tabs/tabs.component';

//import {}

@Component({    
    templateUrl: 'app.component.html'
})
export class AppComponent { 
    rootPage:any = TabsComponent;

    constructor() {
        // platform.ready().then(() => {
        //   // Okay, so the platform is ready and our plugins are available.
        //   // Here you can do any higher level native things you might need.
        //   statusBar.styleDefault();
        //   splashScreen.hide();
        // });
      }
}