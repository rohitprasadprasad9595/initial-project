import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
    this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
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

