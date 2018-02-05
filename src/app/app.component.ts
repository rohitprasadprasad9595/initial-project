import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any= 'SignupPage';
  loader: any;
  constructor(
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private ionicApp: IonicApp,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
    this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      let ready = true;
      platform.registerBackButtonAction(() => {
        let activePortal = ionicApp._loadingPortal.getActive() ||
           ionicApp._modalPortal.getActive() ||
           ionicApp._toastPortal.getActive() ||
           ionicApp._overlayPortal.getActive();

        if (activePortal) {
           ready = false;
           activePortal.dismiss();
           activePortal.onDidDismiss(() => { ready = true; });
           return;
        }
        if (menuCtrl.isOpen()) {
           menuCtrl.close();
           return;
        }
        if (page && page.isRootPage) {
                let alert = this.alertCtrl.create({
                title: 'Exit App',
                message: 'Are you sure you want to exit?',
                cssClass: 'backPop',
                buttons: [
                  {
                    text: 'No',
                    cssClass: 'alert-danger',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                      
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      console.log('App exited');
                      platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.

                    }
                  }
                ]
              });
        } else if (this.nav.canGoBack() || view && view.isOverlay
        ) {
          //  Logger.log("popping back");
           this.nav.pop();
        } else if (localStorage.getItem('introShown')
        ) {
          //  Logger.log("Returning to home page");
           this.nav.setRoot('SignupPage');
        } else if (!localStorage.getItem('introShown')) {
        //  Logger.log("Not yet logged in... exiting");
           platform.exitApp();
        } else {
          //  Logger.log("ERROR with back button handling");
        }

      }, 1);

      this.storage.get('introShown').then((result) => {
 
        if(result){
          this.rootPage = 'SignupPage';
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
        }
 
        this.loader.dismiss();
 
      });
    });
  }
  public navigate(name): void {
    this.nav.push(name);
  };
  
  presentLoading() {
 
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
 
    this.loader.present();
 
  }
}

