import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular"
import {tap} from "rxjs/internal/operators"
import {Todo ,TodoService} from "../../services/todo.service";
import {FcmService} from "../../services/fcm.service";
import {LoadingController} from "@ionic/angular"
@Component({
  selector: 'app-growth',
  templateUrl: './growth.page.html',
  styleUrls: ['./growth.page.scss'],
})
export class GrowthPage implements OnInit {
    activity:any;
    todos: Todo[];

    constructor(private todoService: TodoService, public loadingController: LoadingController,
                public fcm: FcmService,public toastCtrl: ToastController
    ) {
        this.activity='in';
        this.todoService.getTodos().subscribe(res => {
            this.todos = res;
            console.log(res);
        });
    }

  ngOnInit() {

      this.todoService.getTodos().subscribe(res => {
          this.todos = res;
          console.log(res);
      });

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


}
