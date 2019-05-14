import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    name = null;
    nickname =null;
    dob=null;
    place=null;
    city =null;
    phone =null;
    password = null;
  constructor() {

  }

  resetValues(){
      this.name   = '';
      this.nickname = '';
      this.dob   = '';
      this.place = '';
      this.city = '';
  }

  ngOnInit() {
  try{
      this.name     = localStorage.getItem('name');
      this.nickname = localStorage.getItem('nickname');
      this.dob   = localStorage.getItem('dob');
      this.place = localStorage.getItem('place');
      this.city = localStorage.getItem('city');

  }
  catch (err){
    this.resetValues();

  }

  }

}
