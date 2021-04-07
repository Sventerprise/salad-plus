import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainPanelComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
