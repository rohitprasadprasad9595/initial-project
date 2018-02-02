import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import md5 from 'crypto-md5';
// import { HomePage } from '../home/home';
// import 'web-animations-js/web-animations.min';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    email: any;
    password: any;
    profilePicture: any = "https://www.gravatar.com/avatar/"
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  emailChanged(){
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    console.log(this.profilePicture);
  }
  goTo(){
    this.navCtrl.push('HomePage');
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
}
