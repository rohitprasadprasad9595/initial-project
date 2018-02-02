import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeValidator } from  '../../validators/age';
import { UsernameValidator } from  '../../validators/username';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('signupSlider') signupSlider: any;
 
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public menu: MenuController,
       public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        age: ['',AgeValidator.isValid]
  });
  this.slideTwoForm = formBuilder.group({
    username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]),UsernameValidator.checkUsername],
    privacy: ['', Validators.required],
    bio: ['']
});

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  next(){
    this.signupSlider.slideNext();
}

prev(){
    this.signupSlider.slidePrev();
}

save(){
  this.submitAttempt = true;
 
  if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
  }
  else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
  }
  else {
      this.navCtrl.push('LoginPage');
  }

}

}
