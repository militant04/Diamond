import {Finance, Todo, TodoService} from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {HomePage} from "../../home/home.page";
import {Router} from '@angular/router';

@Component({
  selector: 'app-dollartracker',
  templateUrl:  './dollartracker.page.html',
  styleUrls:   ['./dollartracker.page.scss'],
})
export class DollartrackerPage implements OnInit {


    expense: Finance = {
        description: 'pampers',
        amount: '',
        createdAt: new Date().getTime(),

    };

    expenseID = null;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private nav: NavController,
                private todoService: TodoService,
                private loadingController: LoadingController) {}

    async saveExpense() {

        const loading = await this.loadingController.create({
            message: 'Saving Expense..'
        });
        await loading.present();


        this.todoService.addExpense(this.expense).then(() => {
            loading.dismiss();
            this.router.navigateByUrl('/finance');
        });
    }

    ngOnInit() {

    }



}
