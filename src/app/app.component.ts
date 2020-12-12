import { Component, Input, OnInit } from '@angular/core';
import { JokeService } from './services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  joke = '';
  constructor(private readonly jokeService: JokeService) {}

  ngOnInit() {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      if (joke.type === 'single') {
        this.joke = joke.joke;
      } else {
        this.joke = `${joke.setup}\n${joke.delivery}`;
      }
    });
  }
}
