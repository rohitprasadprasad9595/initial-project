// Angular Provided Library
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environment/environment';
// Ionic Library Imports
import { LoadingController, ToastController } from 'ionic-angular';
@Injectable()
export class ToasterService {
  private toaster1: any;
  private toaster2: any;
  // Default Toaster Configuration
  private toasterConfig: any = {
    duration: 3000,
    position: 'bottom'
  };

  constructor(public toasterCtrl: ToastController) { }

  /**
   * @param message : Toat message to display
   * @param duration : Duration time to display toast
   * @param postion : Postion to display toast ['top,bottom,center']
   */
  public displayToast(message: string, duration?: number, postion?: string): void {
    // Check when  content parameter is passed
    if (message !== undefined) {
      this.toasterConfig['message'] = message;
    }
    // Check when  duration parameter is passed
    if (duration !== undefined) {
      this.toasterConfig['duration'] = duration;
    }
    // Check when  postion parameter is passed
    if (postion !== undefined) {
      this.toasterConfig['postion'] = postion;
    }
    if (this.toaster1 === undefined) {
        this.toaster1 = this.toasterCtrl.create(this.toasterConfig);
        this.toaster1.present();
    } else {
        this.toaster2 = this.toasterCtrl.create(this.toasterConfig);
        this.toaster2.present();
    }
  }

  // Close toaster and destroy instance
  public closeToaster(): void {
    if (this.toaster1 !== undefined) {
        this.toaster1.dismiss();
        this.toaster1 = undefined;
    }
    if (this.toaster2 !== undefined) {
        this.toaster2.dismiss();
        this.toaster2 = undefined;
    }
  }
}

@Injectable()
export class LoaderService {
  // Default Loader Configuration
  private loaderConfig: any = {
    content: 'Please wait'
  };
  private loader1: any;
  private loader2: any;
  constructor(public loadingCtrl: LoadingController) { }

  /**
   * @param Content : Message to dispaly in loader
   * @param Duration : Duration to show in loader
   */
  public displayLoader(content?: string, duration?: number): void {

    // Check when  content parameter is passed
    if (content !== undefined) {
      this.loaderConfig['content'] = content;
    }
    // Check when duration parameter is passed
    if (duration !== undefined) {
      this.loaderConfig['duration'] = duration;
    }
    // Create instance
    if (this.loader1 === undefined) {
      this.loader1 = this.loadingCtrl.create(this.loaderConfig);
      this.loader1.present();
    } else {
      this.loader2 = this.loadingCtrl.create(this.loaderConfig);
      this.loader2.present();
    }
  }

  // Close loader and destroy instance
  public closeLoader(): void {
    if (this.loader1 !== undefined) {
      this.loader1.dismiss();
      this.loader1 = undefined;
    }
    if (this.loader2 !== undefined) {
      this.loader2.dismiss();
      this.loader2 = undefined;
    }
  }

}

@Injectable()
export class NotificationService {
  constructor(public loadingCtrl: LoadingController, public http: Http) { }
  // To extract data from response
  private extractData(res: Response): void {
    const body = res.json();
    return body || {};
    // return body.data || {};
  }
  // To handle error from response
  private handleError(error: Response | any): any {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getNotification(options: any): Observable<any> {
    return this.http.get(`${environment.origin}/b2b/notifications/msgs` , options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public setNotificationRead(options: any, data: any): Observable<any> {
    return this.http.put(`${environment.origin}/b2b/notifications`, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}

@Injectable()
export class LocalStorage {
  // Observable current Object Source
  public diamondCartCurrentCount: any = new Subject<any>();
  // To hold authentication token
  private data: any = {
    'token': null
  };

  constructor() {
  }

  public get(key: string): any {
    return this.data[key];
  }

  public set(key: string, value: any): void {
    this.data[key] = value;
  }

  public remove(key: string): any {
    delete this.data[key];
  }

  // set current selected object and broadcast to sidebar subscriber
  public setCurrentObject(selectedObj: any): void {
      this.diamondCartCurrentCount.next(selectedObj);
  }

}
