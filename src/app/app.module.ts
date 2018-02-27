import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SettingsProvider } from '../providers/settings/settings';
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { LoaderService, ToasterService } from '../providers/commom/commom';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { UserProvider } from '../providers/user/user';

// Following is a part of TranslateLoader configuration for multi language implementation
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      // swipeBackEnabled: 'false',
      backButtonText: '',
      scrollAssist: false,
      autoFocusAssist: false,
      pageTransition: 'md-transition'
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Diagnostic,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider,  multi: true},
    ConnectivityServiceProvider,
    SettingsProvider,
    HttpRequestProvider,
    ToasterService,
    LoaderService,
    HttpInterceptorProvider,
    UserProvider
  ]
})
export class AppModule {}
