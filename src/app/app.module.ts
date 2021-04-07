import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { AppComponents } from './barrels/app-components';
import { AppModules } from './barrels/app-modules';
import { MainPanelComponent } from './modules/shared/main-panel/main-panel.component';

@NgModule({
  declarations: [
    ...AppComponents,
  ],
  imports: [
    BrowserModule,
    ...AppModules,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
