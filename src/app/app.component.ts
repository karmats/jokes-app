import { Component, Input, OnInit } from '@angular/core';
import { Joke } from './models/joke';
import { JokeService } from './services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jokes: Joke[] = [];
  constructor(private readonly jokeService: JokeService) {}

  ngOnInit() {
    this.jokeService.getJokes().subscribe((result) => {
      this.jokes = result.jokes;
    });
  }

  findJokes(contains: string, type: string) {
    this.jokeService.getJokes(contains, type).subscribe((result) => {
      this.jokes = result.jokes;
    });
  }
}
