import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../models/joke';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private static readonly BASE_URL = 'https://sv443.net/jokeapi/v2';

  constructor(private readonly http: HttpClient) {}

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(`${JokeService.BASE_URL}/joke/Any`);
  }
}
