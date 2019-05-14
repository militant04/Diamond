import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Firebase } from '@ionic-native/firebase/ngx';
import {Platform} from "@ionic/angular";
import { AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(

      public firebaseNative: Firebase,
      public afs : AngularFirestore,
      private platform : Platform

  ) {}

  async getToken(){

      let token;

      if (this.platform.is('android')){
          token = await this.firebaseNative.getToken();
      }

      if (this.platform.is('ios')){
          token = await this.firebaseNative.getToken();
          await this.firebaseNative.grantPermission();
      }

      if(!this.platform.is('cordova')){

      }
      return this.saveTockenToFireStore(token)

  }

  private saveTockenToFireStore(token){
      if(!token) return;

      const devicesRef  = this.afs.collection('devices')

      const docData ={
          token,
          userID: 'testUser',
      };

      return devicesRef.doc(token).set(docData);

  }

  listenToNotifications(){
      return this.firebaseNative.onNotificationOpen()
  }
}
