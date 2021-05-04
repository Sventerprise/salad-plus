import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { StoreModule } from '@ngrx/store';
import * as fromState from './state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StateEffects } from './state.effects';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducer),
    EffectsModule.forFeature([StateEffects])
  ]
})
export class SharedModule { }
