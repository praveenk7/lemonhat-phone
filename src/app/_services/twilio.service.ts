import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import {User} from '../user'

@Injectable()
export class TwilioService{
    constructor(
        private http:Http,
        //private userObj:User
        //client:any
    ){}
    client: any;
    baseURL: string = "https://bjg25wnk9f.execute-api.us-east-1.amazonaws.com/dev";
    //baseURL: string = "http://192.168.2.48:8089";
    getToken(identity:string, endpointId:string){
        //request('/getToken?identity=' + identity + '&endpointId=' + endpointId, function(err, res) {
        //return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        return this.http.get(this.baseURL+'/getToken?identity=' + identity + '&endpointId=' + endpointId).map((response:Response)=>{
            return response;
        });
    }

    getPhoneVerificationToken(phoneNumber: string, countryCode: number) {
        //let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        //let options = new RequestOptions({ headers: headers });
        
        let postObj = { "phone": phoneNumber, "countryCode":countryCode}
        return this.http.post(this.baseURL + '/phoneverification', postObj).map((response:Response)=>{
            return response;
        });
    }

    verifyPhoneToken(otp:number,userObj:User){
        let postObj = { "verificationToken": otp, "phone": userObj.phone, "countryCode":userObj.countryCode};
        return this.http.post(this.baseURL+'/verifyotp',postObj).map((response:Response)=>{
            return response;
        });
    }

   setTwilioClient(clientObj:any){
       this.client=clientObj;
   }

   getTwilioClient(){
       return this.client;
   }

    getUserDetails(ids: Array<string>) {
        let requestObj = { "ids": ids};
        return this.http.post(this.baseURL + '/user', requestObj).map((response: Response) => {
            return response;
        });
    }

    obj: any = {};
    updateUserDetails(user: User) {
        
        //this.obj["id"] = user.id;
        //this.obj.userName = user.others.userName;
        //this.obj.email = user.others.email;
        //this.obj.phone = user.others.phone;
        //this.obj.countryCode = user.others.countryCode;
    
        return this.http.post(this.baseURL + '/updateuser', user).map((response: Response) => {
            return response;
        });
    }

   


    createItemsList(listName: string, uid: string) {
        var requestObj = { "uid": uid, "listName": listName, "channelType":"private"}
        return this.http.post(this.baseURL + '/createitemslist', requestObj).map((response: Response) => {
            return response;
        });
    }

    getitemslist(uid: string) {
        return this.http.post(this.baseURL + '/itemslist', { "uid": uid }).map((response: Response) => {
            return response;
        });
    }

    getitems(itemsList: string) {
        return this.http.post(this.baseURL + '/items', { "itemsList": itemsList }).map((response: Response) => {
            return response;
        });
    }

    createItem(itemsList: string, uid: string, itemName: string) {
        var requestObj = { "uid": uid, "itemName": itemName, itemsList: itemsList,"imageUrl":""}
        return this.http.post(this.baseURL + '/createitem', requestObj).map((response: Response) => {
            return response;
        });
    }

    getAllUser(uid:any) {
        return this.http.post(this.baseURL + '/users', { "uid": uid}).map((response: Response) => {
            return response;
        });
    }
    
    shareListtoUsers(itemsList: string, sharedUsers: Array<Object>, tChannelId:string) {
        var requestObj = { "itemsList": itemsList, "sharedUsers": sharedUsers, "tChannelId": tChannelId };
        return this.http.post(this.baseURL + '/sharelist', requestObj).map((response: Response) => {
            return response;
        });
    }

    sendMessagetoChannel() {
        return this.http.post(this.baseURL + '/sendmessage', {}).map((response: Response) => {
            return response;
        });
    }
}