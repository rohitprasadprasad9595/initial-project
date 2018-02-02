import { NgModule } from '@angular/core';
import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { TapRevealComponent } from './tap-reveal/tap-reveal';
import { LoadingModalComponent } from './loading-modal/loading-modal';
@NgModule({
	declarations: [ExpandableHeaderComponent,
    ContentDrawerComponent,
    TapRevealComponent,
    LoadingModalComponent],
	imports: [],
	exports: [ExpandableHeaderComponent,
    ContentDrawerComponent,
    TapRevealComponent,
    LoadingModalComponent]
})
export class ComponentsModule {}
