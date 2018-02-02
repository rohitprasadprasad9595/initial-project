import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Slides, Platform, AlertController } from 'ionic-angular';
// import { ExpandableHeaderComponent } from '../../components/expandable-header/expandable-header';
// import { ContentDrawerComponent } from '../../components/content-drawer/content-drawer';
// import { ParallaxHeaderDirective } from '../../directives/parallax-header/parallax-header';
// import { OverslideDirective } from '../../directives/overslide/overslide';
// import { TapRevealComponent } from '../../components/tap-reveal/tap-reveal';
// import { TextMaskModule } from 'angular2-text-mask';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  somethings: any = new Array(20); 
  items: any = new Array(10);
  drawerOptions: any;
  
  masks: any;
 
  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";

  public alertShown: boolean = false;
  constructor(public navCtrl: NavController,public platform: Platform,public alertCtrl: AlertController) {
    platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
        navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      } else {
        if (this.alertShown === false) {
          this.exitAlert();
        }
      }

      // else {
      //   this.exitAlert();
      // }
    }, 0);
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
  };
  
  this.masks = {
    phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
    orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
};
  }
  
  selectTab(index) {
    this.pageSlider.slideTo(index);
  }
  
  handleOverslide(item){
    console.log(item);
}
exitAlert() {
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
          this.alertShown = false;
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('App exited');
          this.platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.

        }
      }
    ]
  });
  // alert.present();
  alert.present().then(() => {
    this.alertShown = true;
  });
}

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
    console.log($event);
  }
 save(){
 
        let unmaskedData = {
            phoneNumber: this.phoneNumber.replace(/\D+/g, ''),
            cardNumber: this.cardNumber.replace(/\D+/g, ''),
            cardExpiry: this.cardExpiry.replace(/\D+/g, ''),
            orderCode: this.orderCode.replace(/[^a-zA-Z0-9 -]/g, '')
        };
 
        console.log(unmaskedData);
 
    }


}
