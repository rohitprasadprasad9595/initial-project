import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ExpandableHeaderComponent } from '../../components/expandable-header/expandable-header';
import { ContentDrawerComponent } from '../../components/content-drawer/content-drawer';
import { ParallaxHeaderDirective } from '../../directives/parallax-header/parallax-header';
import { OverslideDirective } from '../../directives/overslide/overslide';
import { TapRevealComponent } from '../../components/tap-reveal/tap-reveal';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    HomePage,
    ExpandableHeaderComponent,
    ContentDrawerComponent,
    ParallaxHeaderDirective,
    OverslideDirective,
    TapRevealComponent
  ],
  imports: [
    TextMaskModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
