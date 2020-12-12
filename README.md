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
ng serve
```

## Step 2 - Scaffolding

`app.component.html`

```html
<h1>Hello world!</h1>
```

`styles.css`

```css
body {
  font-family: "Lato", sans-serif;
  font-size: 16px;
  padding: 40px;
  box-sizing: border-box;
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
<button>Get joke</button>
```
