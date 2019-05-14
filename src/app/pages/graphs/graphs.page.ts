import { Component, OnInit ,ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, LoadingController } from '@ionic/angular';
import { Reading, TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.page.html',
  styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('barWeight') barWeight;

    barChart: any;
    barHead: any;
    barWeightchart: any;
    activity:any;

    read = '';

    constructor(public loadingController: LoadingController, private todoService: TodoService) {

        this.read =localStorage.getItem('Reading');

    }


    ngOnInit() {

        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
                datasets: [{
                    label: 'Baby s height over time',
                    data: [12, 19, 3, 5, 2, 3,20,23,12,13,14,16],
                    backgroundColor: [
                        'rgba(56, 128, 255, 0.2)',

                    ],
                    borderColor: [
                        'rgba(56, 128, 255, 0.2)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });


         // weight
        this.barWeightchart = new Chart(this.barWeight.nativeElement, {

            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3,20,23,12,13,14,16],
                    backgroundColor: [
                        'rgba(56, 128, 255, 0.2)',

                    ],
                    borderColor: [
                        'rgba(56, 128, 255, 0.2)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });

    }


}
