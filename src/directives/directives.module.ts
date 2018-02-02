import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { OverslideDirective } from './overslide/overslide';
@NgModule({
	declarations: [ParallaxHeaderDirective,
    OverslideDirective],
	imports: [],
	exports: [ParallaxHeaderDirective,
    OverslideDirective]
})
export class DirectivesModule {}
