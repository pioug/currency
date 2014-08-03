**Currency** is a currency converter written in Angular.

![][preview]

Features
---

- Convert multiple currencies at the same time
- Rates come from http://xe.com/ (*scrapped using my [API](https://github.com/pioug/currency/blob/master/api/index.js) hosted on Heroku*)
- Save selected currencies and typed value in localStorage

Building
---

The `server` task in [`gulpfile.js`](https://github.com/pioug/currency/blob/master/gulpfile.js) and the API server rely on a Koa server. Koa currently requires node 0.11.x for the harmony flag. Launch them with the following command:

```bash
# frontend environment
node --harmony-generators `which gulp` serve

# backend environment
node --harmony-generators api
```

API
---

*API server is currently hosted on Heroku.*

All URLs start with `http://aqueous-temple-6169.herokuapp.com/api/v1/`.

- `GET /currencies` will return all currencies supported by http://xe.com.

```
GET /currencies
```

```json
[
  {
    "code": "AED",
    "name": "Emirati Dirham"
  },
  {
    "code": "AFN",
    "name": "Afghan Afghani"
  },
  {
    "code": "ALL",
    "name": "Albanian Lek"
  },
  ...
]
```

- `GET /rate/:from/:to` will return exchange rate between specified currencies.
  - `:from` *three-character currency code*
  - `:to` *three-character currency code*

```
GET /rate/xbt/eur
```

```json
{
  "from": "XBT",
  "to": "EUR",
  "rate": 431.951,
  "timestamp": "2014-03-08T12:56:00.000Z"
}
```

Todos
---

- Improve cross-browser compatibility
- Reduce API calls on client side
- Improve server implementation

Dependencies
---

- [angular](https://angularjs.org/) + [angular-animate](https://docs.angularjs.org/guide/animations)
- [css preprocessor](http://sass-lang.com/)
- [gulp](http://gulpjs.com/) workflow for frontend developement
- [node](http://nodejs.org/) 0.11.x (with harmony flag to use ES6 features)
- [koa web framework](http://koajs.com/)
- [cheerio](http://cheeriojs.github.io/cheerio/) (server side jQuery)
- [q promise library](https://github.com/kriskowal/q)
- [request library](https://github.com/mikeal/request)

References
---

- [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [Experiments with Koa and JavaScript Generators](http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/)
- [Easy Web Scraping With Node.js](http://blog.miguelgrinberg.com/post/easy-web-scraping-with-nodejs)
- [Google design guidelines](http://www.google.com/design/spec/style/color.html)
- [Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/)

[preview]: https://github.com/pioug/currency/blob/master/preview.png
