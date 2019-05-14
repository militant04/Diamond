import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import {Platform, NavController} from "@ionic/angular";
import {Router} from '@angular/router';
import {SQLite,SQLiteObject} from "@ionic-native/sqlite/ngx";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";



@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit {
    dayss:any;
    data :any;
    expenses: any = [];
  constructor(public navCtrl: NavController,
              private router: Router,
              private calendar: Calendar,private localNotifications: LocalNotifications,
              private plt: Platform,private sqlite: SQLite) {



  }



  ngOnInit() {
      //this.getCurrentData();
  }

  scheduleNotification(){

  }



}
