import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { AccountService } from '../services/account.service';
import {Howl, Howler} from 'howler';
import { SoundsService } from '../services/sounds.service';

interface Animal {

}

interface User {
  id : number;
  username : string;
  firstLogin : boolean;
  animal : Animal
}


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {

  username: string;
  password: string;
  user: User;
  

  constructor(
    public switchpage:SwitchPageService,
    public sess:ManageSessionService,
    private account:AccountService,
    public sounds:SoundsService) { }

  ngOnInit(): void {
    //if (this.music == undefined || this.music == null)
    //  this.playMusic()

    let loginsound = this.sounds.list().login;
    
    this.sounds.playLoop(loginsound);
  }

  async GetStats() {

  }

  async Login()
  {

    //do validation, then changepage if user
    console.log(this.username);
    console.log(this.password);

    this.user = await this.account.login(this.username, this.password) as User;

    console.log('user', this.user);
    
    // if user is null, then invalid username + password combination
    if (this.user == null || this.user == undefined) {
      // login failed
      console.log('login failed');
    } else {
      // login successful
      // store userId to session storage
      sessionStorage.setItem('id', this.user.id.toString())
      console.log('login success')
      this.switchpage.changePage('traverse');
    }

    //this.switchpage.changePage('traverse');
  }

  

  ResetStats()
  {
    // this.sess.setHealth("");
    // this.sess.setHunger("");
  }

}
