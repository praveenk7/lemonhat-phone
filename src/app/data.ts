import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
    public paramData: any;
   // public tabComponent: any;
    public itemListId: any;
    public itemAdded: any;
    constructor() {
        console.log('Hello DataProvider Provider');
    }

}