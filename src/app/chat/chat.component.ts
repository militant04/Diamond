import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {ChatService, Todo} from "../chat.service"



@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})


export class ChatComponent implements OnInit {
    todos: Todo[];
    kirasi ='sb14';
    @ViewChild('content') private content: any;


    currentUser=localStorage.getItem('username');
    timeVal : number;



    user: Todo = {
        message: "",
        user: this.currentUser,
        createdAt: new Date().getTime(),


    };




    constructor(private chat: ChatService) {


        setInterval(this.time(), 5000);
        if(localStorage.getItem('username')!=null){
            this.currentUser = localStorage.getItem('username');
            console.log(this.currentUser)
        }


        this.chat.getTodos().subscribe(res => {
            this.todos = res;
            console.log(res);
        });
    }

    time(){
      this.user.createdAt =  new Date().getTime();
    }

    ngOnInit() {
        this.chat.getTodos().subscribe(res => {
            this.todos = res;
            console.log(res);
        });
    }

    sendMessage(){
       // this.user.message ="";

        this.chat.addTodo(this.user).then(() => {
            this.user.message ="";
           // loading.dismiss();

            this.user.createdAt =  new Date().getTime();

            //this.router.navigateByUrl('/finance');
           // this.NavCtrl.navigateRoot('/login');
            this.chat.getTodos().subscribe(res => {
                this.todos = res;
                console.log(res);
            });
        });
    }
}