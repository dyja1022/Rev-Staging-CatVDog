import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStats } from '../interfaces/user-stats';
import { Observable } from 'rxjs';


interface Animal {

}

interface User {
  id : number;
  username : string;
  firstLogin : boolean;
  animal : Animal
}

// interface UserStats{
//   userid: number,
//   totalBattles: number,
//   wins:number,
//   loss:number,
//   experience:number
// }


@Injectable({
  providedIn: 'root'
})

/*
  Handles account login, register
*/
export class AccountService {

  baseUrl = "https://localhost:44363/api";

  //https://localhost:44363/api/user/login?Username=bananaman&Password=bananaman
  constructor(private client: HttpClient) { }

  async login(username:string, password:string) {
    const resp = await this.client.get(this.baseUrl + `/user/login?Username=${username}&Password=${password}`).toPromise();
    return resp;
  }

  async register(usernameInput:string, passwordInput:string, affiliationInput:string) {
    let regUser = {
      username:usernameInput,
      password:passwordInput,
      affiliation:affiliationInput
    }
    var url = this.baseUrl +  `/user/create`;
    const resp = await this.client.post(url, regUser).toPromise();
    return resp;
  }

  async getStats(userId: number) {
    const resp = await this.client.get(this.baseUrl + `/User/stats?userId=${userId}`).toPromise();
    return resp;
  }

  async updateStats(userStats:UserStats){
    //https://localhost:44363/api/User/stats/Update?TotalBattles=0&Wins=0&Loss=0&Experience=1&UserId=1
    var url = this.baseUrl + `/User/stats/Update?userId=${userStats.userid}`;
    const resp = await this.client.put(url,userStats).toPromise();
    return resp;
  }
  

}
