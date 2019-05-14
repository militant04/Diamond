import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {NavController} from "@ionic/angular"
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {TodoService} from "../../services/todo.service"


import {GooglePlus} from "@ionic-native/google-plus/ngx";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserData{

    id?: string;
    username: string;
    Password: string;
    Title: string;
    Initial: string;
    Firstname: string;
    Surname:string;
    DOB: string;
    Sex: string;
    Howmany: string;
    Orientation: string;
    Cell: string;
    email: string;
    Country: string;
    Town: string;
    createdAt: number;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userCollection : AngularFirestoreCollection<UserData>;
    userCol: Observable<UserData[]>;
    userColData:any;

    user = {"username": "","password": ""};
    hasClickedLog: boolean;
    other: boolean;
    message: any;
    querie: any;
    back: boolean;

  constructor(public afAuth: AngularFireAuth,private googlePlus: GooglePlus,private todoService:TodoService,
              public loadingController: LoadingController,private db: AngularFirestore,
              public toastController: ToastController,private users:TodoService,
              public AlertCntrl: AlertController,private NavCtrl: NavController,
              private router: Router) {

      this.hasClickedLog = true;
      this.other = false;

  }

  ngOnInit() {

      console.log('Login Loaded');

      // this.todoService.getUsers().subscribe(res => {
      //     localStorage.setItem('Users', JSON.stringify(res))
      //     console.log('nda setter item')
      // });




      if (localStorage.getItem("username")!= null){
          this.user.username = localStorage.getItem("username");
          this.user.password = localStorage.getItem("password")

          this.loginWithFire();
      }
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

    async  send(){
        (<any>window).FirebasePlugin.verifyPhoneNumber('+263776395824', 60, function(credential) {
            console.log(credential);

            // ask user to input verificationCode:
            // let code = this.user.username;
            //
            // let verificationId = credential.verificationId;
            //
            // let signInCredential = this.afAuth.auth.PhoneAuthProvider.credential(verificationId, code);
            // this.afAuth.auth().signInWithCredential(signInCredential);
        }, function(error) {
            console.error(error);
        });


    }


    navigate(){

    }

    controlLogin(){

        // const loading = await this.loadingController.create({
        //     message: 'Logging In.'
        // });
        // await loading.present();






    }

    controlSignUp(){

        this.router.navigateByUrl('/signup')
        this.hasClickedLog = true;
        this.other = false;
    }

    async signup(){

        const loading = await this.loadingController.create({
                 message: 'Logging In.'
            });
            await loading.present();

            //setTimeout(() => this.back =true, 4000);

        localStorage.removeItem('User');

        try{
            const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.username ,this.user.password)
                .then(auth => {
                    localStorage.setItem("username",this.user.username);
                    localStorage.setItem("password",this.user.password);

                    this.NavCtrl.navigateRoot('/readings');
                    this.hasClickedLog = true;
                    this.other = false;
                    console.log(auth);
                })
                .catch(err => {
                    console.log(err.code);
                    loading.dismiss();
                    this.presentAlert(err.code,err.message);

                });
            console.log(result);
             loading.dismiss();
            //  this.router.navigateByUrl('/cloudhome');

        }
        catch (error){
            console.log(error);

        }







    }

    // async loginWithGoogle(): Promise<void> {
    //     try {
    //         const provider = new firebase.auth.GoogleAuthProvider();
    //         const credential = await this.afAuth.auth.signInWithPopup(provider);
    //
    //     } catch(err) {
    //         console.log(err)
    //     }
    //
    // }

      loginWithGoogle(){
        // await  this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
        // this.router.navigate(['/readings']);
          this.googlePlus.login({})
              .then(res => console.log(res))
              .catch(err => console.error(err));
    }

  async register(){
      const loading = await this.loadingController.create({
          message: 'Registering..'
      });
      await loading.present();
   try{
       const result = this.afAuth.auth.createUserWithEmailAndPassword(this.user.username,this.user.password)
           .then(auth => {
               this.router.navigateByUrl('/home');
           })
           .catch(err => {
               console.log(err.code);
               loading.dismiss();
               this.presentAlert(err.code,err.message);
           });
       console.log(result);
       loading.dismiss();

   }
   catch (error){
       console.log(error);

   }

  }


  async login(){



      try{

          this.router.navigateByUrl('/signup');

      }
      catch (error){
          console.log(error);

      }



  }

  async  loginWithFire() {




      try{
          const loading = await this.loadingController.create({
              message: 'Logging In..',
              duration: 5000
          });
          await loading.present();

          if(this.user.username.length<1 || this.user.password.length<1){
              loading.dismiss();
              this.presentAlert('Failed to Login','Missing username or password');
              return
          }


          this.userCollection = this.db.collection('InteracialUsers',
              ref => ref.where('username', '==', this.user.username)
                  .where('Password', '==', this.user.password)
          );
          this.userColData = this.userCollection.snapshotChanges().pipe(
              map(actions => {
                  return actions.map(a => {
                      const data = a.payload.doc.data();
                      const id = a.payload.doc.id;
                      return { id, ...data };
                  });
              })
          ).subscribe(res => {
              let lala =  JSON.stringify(res);
              let ndaneta  = JSON.parse(lala);
              // console.log(ndaneta[0].Password);


              if(ndaneta.length == 1){
                  localStorage.setItem("username",this.user.username);
                  localStorage.setItem("password",this.user.password);
                  loading.dismiss();
                  this.NavCtrl.navigateRoot('/readings');
              }
              else {
                  loading.dismiss();
                  this.presentAlert('Failed to Login','Wrong Username or Password');
              }
          });



      }
      catch (err){
          this.presentAlert(err,'405');

      }




    }

}
