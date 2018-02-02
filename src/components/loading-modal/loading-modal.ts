import { Component } from '@angular/core';
// import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
  selector: 'loading-modal',
  templateUrl: 'loading-modal.html',
  // directives: [IONIC_DIRECTIVES]]
})
export class LoadingModalComponent {

  text: string;

  constructor() {
    console.log('Hello LoadingModalComponent Component');
    this.text = 'Hello World';
  }

}
