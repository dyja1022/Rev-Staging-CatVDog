import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchPageService {

  constructor() { }

  page = "login";

  changePage(page:string)
  {
    this.page = page;
  }
}
