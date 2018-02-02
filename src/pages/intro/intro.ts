import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,) {
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  goToHome(){
    this.navCtrl.setRoot('SignupPage');
  }
  
}
