import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { AppComponents } from './barrels/app-components';
import { AppModules } from './barrels/app-modules';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { OrderStaticDataEffects } from './stores/effects/order-static-data.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppMockInterceptors } from './barrels/app-mocks';
import { reducers, metaReducers } from './stores';

@NgModule({
  declarations: [
    ...AppComponents,
  ],
  imports: [
    BrowserModule,
    ...AppModules,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([OrderStaticDataEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    ...(environment.useMocking ? AppMockInterceptors : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
