import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShared from './state/shared.reducer';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducer)
  ]
})
export class SharedModule { }
