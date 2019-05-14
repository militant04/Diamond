import { Component, OnInit } from '@angular/core';
import {NavController, LoadingController, Platform} from '@ionic/angular';
import {Reading, TodoService ,User } from './../../services/todo.service';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import {ChatService, Todo} from "../../chat.service";




@Component({
  selector: 'app-readings',
  templateUrl: './readings.page.html',
  styleUrls: ['./readings.page.scss'],
})
export class ReadingsPage implements OnInit {

    readingVal:any;
    typeVal: any;
    todos: User[];
    todo: Todo[];

    subscription:any;

    userData = {"read": "","password": ""};

    reading: Reading = {
        readings: this.userData.read,
        createdAt: new Date().getTime(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        type: '0'
    };

  constructor(public loadingController: LoadingController,private chat: ChatService,
              public menu: MenuController,private platform: Platform,
              private router: Router, private navCtrl: NavController,
              private todoService: TodoService) {


      if(localStorage.getItem('Users')!=null){
          this.todoService.getUsers().subscribe(res => {
               localStorage.setItem('Users', JSON.stringify(res))

              console.log(res);
              this.todos = JSON.parse(localStorage.getItem('Users'));

          });

      }
      else{
          this.todoService.getUsers().subscribe(res => {
              localStorage.setItem('Users', JSON.stringify(res))
              console.log(res);
              this.todos = JSON.parse(localStorage.getItem('Users'));
              // this.todos = res;
              console.log(this.todos)
          });

      }


  }

    ionViewDidEnter(){
        this.subscription = this.platform.backButton.subscribe(()=>{
            navigator['app'].exitApp();
        });
    }

    ionViewWillLeave(){
        this.subscription.unsubscribe();
    }

    ionViewWillEnter(){
         // this.chat.getTodos().subscribe(res => {
         //     this.todo = res;
         //     console.log(res);
         // });

    }


    async saveReading() {

        const loading = await this.loadingController.create({
            message: 'Saving Reading..'
        });
        await loading.present();


        this.todoService.addReading(this.reading).then(() => {
            loading.dismiss();
            this.router.navigateByUrl('/graphs');
            localStorage.setItem('Reading' ,this.reading.readings);
            console.log('Reading Saved Successfully');
            const data = localStorage.getItem('Reading');
            console.log(data);
        });
    }



    ngOnInit() {
  }

    attending(){
        this.navCtrl.navigateRoot('/finance');
    }
    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }
    goToChat(){
        this.navCtrl.navigateRoot('/chats');
    }

  goBack(){
      this.navCtrl.navigateRoot('/finance');
  }
}
