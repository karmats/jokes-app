import { Component, Input, OnInit } from '@angular/core';
import { Joke } from 'src/app/models/joke';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.css'],
})
export class JokeCardComponent implements OnInit {
  @Input() joke: Joke;

  text = '';

  constructor() {}

  ngOnInit(): void {
    if (this.joke.type === 'single') {
      this.text = this.joke.joke;
    } else {
      this.text = `${this.joke.setup}\n${this.joke.delivery}`;
    }
  }
}
