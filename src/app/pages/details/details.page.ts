
import { Todo, TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {HomePage} from "../../home/home.page";
import {Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    todo: Todo = {
        task: 'test',
        createdAt: new Date().getTime(),
        priority: ''
    };

    todoId = null;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private nav: NavController,
                private todoService: TodoService,
                private loadingController: LoadingController) { }

    ngOnInit() {
        this.todoId = this.route.snapshot.params['id'];
        if (this.todoId)  {
            this.loadTodo();
        }
    }

    async loadTodo() {
        const loading = await this.loadingController.create({
            message: 'Loading Todo..'
        });
        await loading.present();

        this.todoService.getTodo(this.todoId).subscribe(res => {
            loading.dismiss();
            this.todo = res;
        });
    }

    async saveTodo() {

        const loading = await this.loadingController.create({
            message: 'Saving Todo..'
        });
        await loading.present();

        if (this.todoId) {
            this.todoService.updateTodo(this.todo, this.todoId).then(() => {
                loading.dismiss();
                this.router.navigateByUrl('/home');
            });
        } else {
            this.todoService.addTodo(this.todo).then(() => {
                loading.dismiss();
                this.router.navigateByUrl('/home');
            });
        }
    }

}
