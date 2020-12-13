# Angular codegames

Project for Wolters Kluwer codegames.

## Step 1 - Initialize project

```bash
$ ng new jokes-app
```

- Stricter type checking -> No
- Routing -> No
- Stylesheet format -> CSS

Verify that it works with

```
$ cd jokes-app
$ ng serve
```

## Step 2 - Scaffolding

`app.component.html`

```html
<h1>Hello world!</h1>
```

`styles.css`

```css
body {
  background: #f6f6f6;
  font-family: "Lato", sans-serif;
  padding: 40px;
}
```

## Step 3 - Create a service for http calls

```bash
$ ng g service services/joke
```

Add `HttpClientModule` in `app.module.ts` imports array.

`app.module.ts`

```typescript
  imports: [BrowserModule, HttpClientModule],
```

Create method `getRandomJoke()`

`joke.service.ts`

```typescript
export class JokeService {
  private static readonly BASE_URL = "https://sv443.net/jokeapi/v2";

  constructor(private readonly http: HttpClient) {}

  getRandomJoke() {
    return this.http.get(`${JokeService.BASE_URL}/joke/Any`);
  }
}
```

Inject the service and call the method.

`app.component.ts`

```typescript
export class AppComponent implements OnInit {
  constructor(private readonly jokeService: JokeService) {}

  ngOnInit() {
    this.jokeService.getRandomJoke().subscribe((joke) => {
      console.log(joke);
    });
  }
}
```

## Step 4 - Joke type

```bash
$ ng g interface models/joke
```

`joke.ts`

```typescript
export interface Joke {
  category: string;
  type: "single" | "twopart";
  joke: string;
  setup: string;
  delivery: string;
}
```

`joke.service.ts`

```typescript
getRandomJoke(): Observable<Joke> {
  return this.http.get<Joke>(`${JokeService.BASE_URL}/joke/Any`);
}
```

## Step 5 - Display the joke

`app.component.ts`

```typescript
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
```

`app.component.html`

```html
<h1>{{ joke }}</h1>
```

## Step 6 - Search controls

`app.component.html`

```html
<div>
  <label for="input">Contains text</label>
  <input id="input" />
</div>
<div>
  <label for="select">Type</label>
  <select id="select">
    <option value="">Any</option>
    <option value="single">Single</option>
    <option value="twopart">Two part</option>
  </select>
</div>
<button>Get jokes</button>
```

## Step 7 - Find jokes

`joke.service.ts`

```typescript
getJokes(contains?: string, type?: string): Observable<{ jokes: Joke[] }> {
  return this.http.get<{ jokes: Joke[] }>(
    `${JokeService.BASE_URL}/joke/Any`,
    {
      params: {
        contains: contains ?? '',
        type: type ?? '',
        amount: '8',
      },
    }
  );
}
```

`app.component.ts`

```typescript
findJokes(contains: string, type: string) {
  this.jokeService.getJokes(contains, type).subscribe((jokes) => {
    console.log(jokes);
  })
}
```

`app.component.html`

```html
<input id="input" #contains />
...
<select id="select" #type>
  ...
</select>
...
<button (click)="findJokes(contains.value, type.value)">Get jokes</button>
```

## Step 8 - Display the results

`app.component.ts`

```typescript
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
      if (joke.type === "single") {
        return joke.joke;
      }
      return `${joke.setup}\n${joke.delivery}`;
    });
  }
}
```

`app.component.html`

```html
<div>
  <p *ngFor="let joke of jokes">{{ joke }}</p>
</div>
```

## Step 9 - Create a joke card component

```bash
$ ng g component components/joke-card
```

`joke-card.component.ts`

```typescript
export class JokeCardComponent implements OnInit {
  @Input() joke: Joke;

  text = "";

  constructor() {}

  ngOnInit(): void {
    if (this.joke.type === "single") {
      this.text = this.joke.joke;
    } else {
      this.text = `${this.joke.setup}\n${this.joke.delivery}`;
    }
  }
}
```

`joke-card.component.html`

```html
<div>{{ text }}</div>
```

`app.component.ts`

```typescript
jokes: Joke[] = [];
...
this.jokes = result.jokes;
```

`app.component.html`

```html
<app-joke-card *ngFor="let joke of jokes" [joke]="joke"></app-joke-card>
```

## Step 10 - Style the app.component

`app.component.html`

```html
<div class="container">
  <div class="filter-container">
    <div class="filter-control">...</div>
    <div class="filter-control">...</div>
    <button class="button" (click)="findJokes(contains.value, type.value)">
      Get jokes
    </button>
  </div>
  <div class="results">...</div>
</div>
```

`app.component.css`

```css
.container {
  width: 1200px;
  margin: 0 auto;
}

.filter-container {
  background-color: #fff;
  padding: 25px;
  margin-bottom: 40px;
}

.filter-control {
  max-width: 40%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.button {
  background: darkmagenta;
  color: white;
  border: none;
  padding: 5px 10px;
}

.results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 30px;
}
```
