import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {LoadingController, Platform} from "@ionic/angular";
import {TodoService, User} from "../../services/todo.service";
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { NavController} from "@ionic/angular"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    user: User = {
    username: "",
    Password: "",
    Title: "",
    Initial: "",
    Firstname: "",
        Surname:"",
    DOB: "",
    Sex: "",
    Howmany: "",
    Orientation: "",
    Cell: "",
    email: "",
    Country: "",
    Town: "",
        createdAt: new Date().getTime(),

    };




  constructor(private router: Router,private plt: Platform,private NavCtrl: NavController,
              private loadingController: LoadingController,   public AlertCntrl: AlertController,
              private todoService: TodoService,public afAuth: AngularFireAuth,
              private localNotifications: LocalNotifications,) {

      this.plt.ready().then(() => {


      })
  }

  ngOnInit() {
  }
    async presentAlert(err,errcode) {
        const alert = await this.AlertCntrl.create({
            header: '',
            subHeader: err,
            message: errcode,
            buttons: ['OK']
        });

        await alert.present();
    }

 async registerNewUser(){


      if(this.user.username.length<1){
          this.presentAlert('','Please Enter Username');

          return
      }
     if(this.user.Password.length<1){

         this.presentAlert('','Please Enter Password');
         return
     }
     if(this.user.Cell.length<1){

         this.presentAlert('','Please Enter Cell Number');
         return
     }
     if(this.user.Cell.length<9){

         this.presentAlert('','Phone Number must have at least 9 digits');
         return
     }



     try{
          const loading = await this.loadingController.create({
              message: 'Creating New User..'
          });
          await loading.present();

          console.log(this.user.email);
          console.log(this.user.Password);
          localStorage.removeItem('User');


          //localStorage.setItem("username",this.user.email);
        //  localStorage.setItem("password",this.user.Password);
          this.todoService.addUser(this.user).then(() => {
              loading.dismiss();

              //this.router.navigateByUrl('/finance');
              this.NavCtrl.navigateRoot('/login');
          });




       }
       catch (err){
          throw err
       }
       finally {
          this.plt.ready().then(() => {
            this.scheduleNotification();

          });
          //this.router.navigateByUrl('/finance');
      }



  }

    scheduleNotification(){

        this.localNotifications.schedule({
            id: 1,
            text: 'Welcome To Diamonds -Thank you for registering with us',
            data: {mydata: "Look at the Nutrition Planner and see what you gotta do"},
            trigger: {at: new Date(new Date().getTime() + 3600)},
        });
    }


}
