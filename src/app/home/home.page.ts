import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import {FcmService} from "../services/fcm.service"
import {ToastController} from "@ionic/angular"
import {tap} from "rxjs/internal/operators"

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    todos: Todo[];

    constructor(private todoService: TodoService,
                public fcm: FcmService,public toastCtrl: ToastController

                ) {
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
            duration: 2000
        });
        toast.present();
    }

    remove(item) {
        this.todoService.removeTodo(item.id);
    }
}