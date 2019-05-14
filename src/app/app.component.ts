import { Component } from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicModule} from "@ionic/angular";
import { MenuController } from '@ionic/angular';
import {NavController} from "@ionic/angular"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    username: any;
    subscription:any;
  constructor(
    private platform: Platform,private NavCtrl : NavController,
    private splashScreen: SplashScreen, public loadingController: LoadingController,
    private statusBar: StatusBar,private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.splashScreen.hide();
        this.statusBar.backgroundColorByHexString('#ff1b39');
        this.statusBar.styleLightContent();
        if(localStorage.getItem('username')!=null){
            this.username = localStorage.getItem('username');
        }
        else{
            this.username = "user"
        }


    });
  }


    ionViewDidEnter(){
        this.subscription = this.platform.backButton.subscribe(()=>{
            navigator['app'].exitApp();
        });
    }

    ionViewWillLeave(){
        this.subscription.unsubscribe();
    }

   async logout(){
        const loading = await this.loadingController.create({
            message: 'Logging Out..',
            duration: 5000
        });
        await loading.present();
        localStorage.clear();
        localStorage.removeItem('username');
        this.menu.close('first');

        setTimeout(() =>navigator['app'].exitApp(), 3000);

       // this.NavCtrl.navigateRoot('/login');
    }

    event(){
        this.menu.close('first');
        this.NavCtrl.navigateRoot('/readings');
    }
    payment(){
        this.menu.close('first');
        this.NavCtrl.navigateRoot('/cloudhome');
    }
    contact(){
        this.menu.close('first');
        this.NavCtrl.navigateRoot('/popover');
    }
}
