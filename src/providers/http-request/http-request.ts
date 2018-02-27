import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import { ToasterService } from '../commom/commom';
import { environment } from '../../environment/environment';
import { UserProvider } from '../user/user';

@Injectable()
export class HttpRequestProvider {
   // To hold network status
   private isNetworkDisconnected: boolean = false;

   constructor(private httpClient: HttpClient, private network: Network, private toasterService: ToasterService, private userService: UserProvider) {
       // Check if network is connected
       this.network.onConnect().subscribe(
           (data) => {
               this.isNetworkDisconnected = false;
               this.userService.set('isNetworkDisconnected', false);
           },
           (error) => {
               console.error(error);
           }
       );
       // Check if network is disconnected
       this.network.onDisconnect().subscribe(
           (data) => {
               this.isNetworkDisconnected = true;
               this.userService.set('isNetworkDisconnected', true);
           },
           (error) => {
               console.error(error);
           }
       );
   }

   /**
    * Generic Http Request Function to call all APIs
    * @param requestType Like get, post, delete
    * @param apiCall API call string
    * @param data Pass data in the form of Object
    */
   public httpRequest(requestType: string, apiCall: string, data?: any): Observable<any> {
       // If network is disconnected, throw error and display msg
       if (this.isNetworkDisconnected === false) {
           // Get Request
           // If get request has data to be passed then pass it into third parameter of this function. Like 'page=1'
           if (requestType === 'get' && data !== undefined) {
               return this.httpClient.get(`${environment.origin}/${apiCall}`, {params: data});
           }
           return this.httpClient[requestType](`${environment.origin}/${apiCall}`, data);
       } else {
           this.toasterService.displayToast('Network Disconnected', 2000, 'bottom');
           return Observable.throw('Network Disconnected');
       }
   }
}
