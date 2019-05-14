import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SQLite,SQLiteObject} from "@ionic-native/sqlite/ngx";


@Component({
  selector: 'app-addnutrition',
  templateUrl: './addnutrition.page.html',
  styleUrls: ['./addnutrition.page.scss'],
})
export class AddnutritionPage implements OnInit {

    mealDescription :any;
    mealTime: any;
    mealDay: any;

  constructor(private router: Router, private sqlite: SQLite) { }

  ngOnInit() {
  }

  saveMeal(){
      this.saveToSQL();
      try{
          localStorage.setItem('mealDescription',this.mealDescription);
          localStorage.setItem('mealTime',this.mealTime);
          localStorage.setItem('mealDay',this.mealDay);
          alert('Succesfully added');
      }
      catch (error){
          alert(error);
      }
      finally {
          setTimeout(() => this.router.navigateByUrl('/planner') , 1000);
      }

  }

  saveToSQL(){

      this.sqlite.create({
          name: 'data.db',
          location: 'default'
      }).then((db: SQLiteObject) => {

          let createTable = 'CREATE TABLE IF NOT EXISTS nutrition(rowID INTEGER PRIMARY KEY, day TEXT, date TEXT, mealTime TEXT, description TEXT)';

          db.executeSql(createTable ,[])
              .then(res => console.log('Executed SQL'))
              .catch(e => console.log(e));

          let query = 'INSERT INTO nutrition VALUES(NULL,?,?,?,?)';
          db.executeSql(query,[this.mealDay, this.mealTime,this.mealTime,this.mealDescription])
                  .then(() =>this.onComplete()
                  )
                  .catch(e => console.log(e));


          })
          .catch(e => console.log(e));
  }

  onComplete(){
      alert('succesfully added');
      this.router.navigateByUrl('/cloudhome');
  }



}
