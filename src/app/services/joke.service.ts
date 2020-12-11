import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private static readonly BASE_URL = 'https://sv443.net/jokeapi/v2';

  constructor(private readonly http: HttpClient) {}

  getRandomJoke() {
    return this.http.get(`${JokeService.BASE_URL}/joke/Any`);
  }
}
