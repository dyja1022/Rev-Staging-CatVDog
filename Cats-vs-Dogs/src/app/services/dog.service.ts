import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class DogService {

  apiUrl: string = "https://dog.ceo/api/breeds/image/random";

  constructor(private client: HttpClient) { }

  getRandomImage() {
    return this.client.get(this.apiUrl);
  }

}
