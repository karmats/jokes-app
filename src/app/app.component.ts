import { Component, Input, OnInit } from '@angular/core';
import { Joke } from './models/joke';
import { JokeService } from './services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jokes: string[] = [];
  constructor(private readonly jokeService: JokeService) {}

  ngOnInit() {
    this.jokeService.getJokes().subscribe((result) => {
      this.jokes = this.jokesToText(result.jokes);
    });
  }

  findJokes(contains: string, type: string) {
    this.jokeService.getJokes(contains, type).subscribe((result) => {
      this.jokes = this.jokesToText(result.jokes);
    });
  }

  private jokesToText(jokes: Joke[]) {
    return jokes.map((joke) => {
      if (joke.type === 'single') {
        return joke.joke;
      }
      return `${joke.setup}\n${joke.delivery}`;
    });
  }
}
