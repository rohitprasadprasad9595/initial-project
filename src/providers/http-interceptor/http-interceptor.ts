// Angular Library Imports
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
// Our Custom Imports
// import { LocalStorage } from '../common/common.services';
import { ToasterService } from '../../providers/commom/commom';
import { UserProvider } from '../user/user';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(private toasterService: ToasterService, private userService: UserProvider) {
  }

  // Intercept the HTTP Request to modify headers and handle errors
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Define constants
    // const token = this.localStorage.get('token');
    // const language = this.localStorage.get('language');
    // const headers = { 'devicetype': 'android' };

    // First time token will be null on login screen
    // if (token !== null) {
    //   // headers['authorization'] = token;
    // }
    // // If user has selected any language
    // if (language !== undefined && language !== null) {
    //   // headers['appLang'] = language;
    // }

    // Hold the request object
    // const req = request.clone({
    //   setHeaders: headers
    // });

    // Handle request
    return next.handle(request).do(
      (success) => {},
      (error) => {
        // If network is disconnected, throw error and display msg
        if (this.userService.get('isNetworkDisconnected') === true) {
          //
          this.toasterService.displayToast('Network Disconnected', 2000, 'bottom');
        }
      }
    );
  }
}
