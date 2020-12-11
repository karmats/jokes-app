import { Component, OnInit } from '@angular/core';
import { JokeService } from './services/joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private readonly jokeService: JokeService) {}

  ngOnInit() {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      console.log(joke);
    });
  }
}
