import { Component, OnInit } from '@angular/core';
import {Platform, ToastController} from "@ionic/angular"
import {tap} from "rxjs/internal/operators"
import {Finance, Todo, TodoService, User} from "../../services/todo.service";
import {FcmService} from "../../services/fcm.service";
import {LoadingController} from "@ionic/angular"
import {Router} from '@angular/router';

import { MenuController } from '@ionic/angular';

import {GraphsPage} from "../graphs/graphs.page";


@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
    todos: User[];
    amount = null;
    searchText: string = "";
    subscription: any;

  constructor(private todoService: TodoService,private platform: Platform,
              private menu: MenuController,
              private router: Router,public loadingController: LoadingController,
     public fcm: FcmService,public toastCtrl: ToastController) {
      if(localStorage.getItem('Users')!=null) {
          this.todoService.getUsers().subscribe(res => {
              localStorage.setItem('Users', JSON.stringify(res))
          });
      }

  }

    ngOnInit() {


            if(localStorage.getItem('Users')!=null){
                this.todos = JSON.parse(localStorage.getItem('Users'));
                console.log("I am using localstorage")
            }
            else {

                this.todoService.getUsers().subscribe(res => {
                    localStorage.setItem('Users', JSON.stringify(res))
                    this.todos = JSON.parse(localStorage.getItem('Users'));
                });


                console.log("I am using res")
                // this.todos = JSON.parse(localStorage.getItem('Users'));

            }

            console.log(this.todos);



        this.fcm.getToken();

        this.fcm.listenToNotifications().pipe(
            tap(msg =>{
                this.presentToast(msg);
            })
        )
            .subscribe()
    }


    async presentToast(mesg) {
        const toast = await this.toastCtrl.create({
            message: mesg,
            duration: 3000
        });
        toast.present();
    }

    remove(item) {
        this.todoService.removeTodo(item.id);
    }

    async checkAvailability(){

        const loading = await this.loadingController.create({
            message: 'Checking Availability..',
            duration: 5000
        });
        await loading.present();



    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    check(){
        console.log(JSON.parse(localStorage.getItem('Users')))
    }




    logout(){
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

}
