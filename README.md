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
