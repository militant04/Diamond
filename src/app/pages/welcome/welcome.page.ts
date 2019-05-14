import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Platform, ToastController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular'
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {TodoService} from "../../services/todo.service";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import{LoginPage} from "../login/login.page"
import {async} from "rxjs/internal/scheduler/async";
// import {LoadingController} from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data{
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
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    user = {"username": "","password": ""};
    userCollection : AngularFirestoreCollection<Data>;
    userCol: Observable<Data[]>;
    userColData:any;
    subscription:any;

  constructor(public afAuth: AngularFireAuth, private platform: Platform, public googlePlus: GooglePlus,public db: AngularFirestore,
              public loadingController: LoadingController,private loginCtrl: TodoService,private loginn: LoginPage,
              public toastController: ToastController,
              public AlertCntrl: AlertController,
              private router: Router) { }

  ngOnInit() {

      if(localStorage.getItem("username")!= null){


          // this.loginWithFire()
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
    ionViewDidEnter(){
        this.subscription = this.platform.backButton.subscribe(()=>{
            navigator['app'].exitApp();
        });
    }

    ionViewWillLeave(){
        this.subscription.unsubscribe();
    }

    async login(){
        this.router.navigateByUrl('/login');
        // if (localStorage.getItem("username")!= null){
        //     try{
        //
        //         const loading = await this.loadingController.create({
        //             message: 'Logging In.'
        //         });
        //         await loading.present();
        //
        //         let username = localStorage.getItem("username");
        //         let password = localStorage.getItem("password")
        //         localStorage.removeItem('User');
        //         const result = this.afAuth.auth.signInWithEmailAndPassword(username ,password)
        //             .then(auth => {
        //                 this.router.navigateByUrl('/finance');
        //                 console.log(auth);
        //             })
        //             .catch(err => {
        //                 console.log(err.code);
        //                 loading.dismiss();
        //                 this.presentAlert(err.code,err.message);
        //
        //             });
        //         console.log(result);
        //         loading.dismiss();
        //         //  this.router.navigateByUrl('/cloudhome');
        //
        //     }
        //     catch (error){
        //         console.log(error);
        //
        //     }
        //
        //
        //
        // }
        // else{
        //     try{
        //
        //         this.router.navigateByUrl('/login');
        //
        //     }
        //     catch (error){
        //         console.log(error);
        //
        //     }
        // }

    }

    async register(){



        try{

            this.router.navigateByUrl('/signup');

        }
        catch (error){
            console.log(error);

        }



    }
    async  loginWithGoogle(){
        await  this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
        this.router.navigate(['/readings']);
    }


     doGoogleLogin(){

    }



    async  loginWithFire() {

        let username = localStorage.getItem("username");
        console.log(username);
        let password = localStorage.getItem("password");
        console.log(password);
        try{
            const loading = await this.loadingController.create({
                message: 'Logging In..',
                duration: 5000
            });
            await loading.present();

            this.userCollection = this.db.collection('InteracialUsers',
                ref => ref.where('username', '==',localStorage.getItem("username"))
                    .where('Password', '==', localStorage.getItem("password"))
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



                if(ndaneta[0].Password = this.user.password){
                    loading.dismiss();
                    this.router.navigateByUrl('/finance');
                }
                else {
                    loading.dismiss();
                    this.presentAlert('Failed to Login','404');
                }
            });



        }
        catch (err){
            this.presentAlert(err,'405');

        }




    }




}
