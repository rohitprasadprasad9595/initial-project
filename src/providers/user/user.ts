// Angular Provided Library
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// Ionic Library Imports
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

@Injectable()
export class UserProvider {

    // To hold user data and configuration
    private userPreferences: any = {
        
    };

    // Observable current  Page Info Object Source
    public currentPageInfo: any = {};
    // Observable current  Page Info Object Observable
    public currentPageInfoObservable = new Subject<any>();

    constructor(
        private storage: Storage,
        private diagnostic: Diagnostic,
    ) {
        // Register a handler for location state change
       // this.diagnostic.registerLocationStateChangeHandler((isStateChanged) => {
         //   console.log('UserService GPS Status', isStateChanged);
          //  if (isStateChanged === 'high_accuracy') {
            //    this.set('isGPSAvailable', true);
           // } else {
             //   this.set('isGPSAvailable', false);
           // }
      // }); 
    }

    /**
     * @param key : Getter returns user data as passed key in argument
     */
    public get(key: string): any {
        return this.userPreferences[key];
    }

    /**
     * @param key : Property nane sets user data with a named key as passed key in argument
     * @param data : Setter sets user data on passed key in argument
     */
    public set(key: string, data: any): void {
        this.userPreferences[key] = data;
        // Update userPreferences in app storage
        this.storage.set('userPreferences', this.userPreferences);
    }

    /**
     * @param key : Property name sets user data with a named key as passed key in argument
     * @param data : Setter sets user data on passed key in argument
     */
    public setCurrentPageInfo(key: string, data: any) {
        this.currentPageInfo[key] = data;
        this.currentPageInfoObservable.next(this.currentPageInfo);
    }

    /**
     * @param userPreferences : Property sets user preferences
     */
    public setUserPreferenceFromStorage(userPreferences: any): void {
        this.userPreferences = userPreferences;
    }



}
