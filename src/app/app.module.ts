import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuth} from 'angularfire2/auth';
import {FcmService} from "./services/fcm.service";
import { Firebase } from '@ionic-native/firebase/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import {SQLite,SQLiteObject} from "@ionic-native/sqlite/ngx";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import { PopoverComponent } from './components/popover/popover.component';
import {CallNumber} from "@ionic-native/call-number";
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {LoginPage} from "./pages/login/login.page";
import {ChatService} from "./chat.service"



@NgModule({
  declarations: [AppComponent, PopoverComponent, ChatComponent],
  entryComponents: [PopoverComponent],

  imports: [BrowserModule,IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase)
  , AngularFirestoreModule,
      FormsModule
  ],
  providers: [
    StatusBar,ChatService,FcmService,Firebase, SQLite,LocalNotifications,
    SplashScreen,AngularFireAuth,Calendar,GooglePlus,LoginPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
