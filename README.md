**Currency** is a currency converter written in Angular.

Features
---

- Convert multiple currencies at the same time
- Rates come from http://xe.com/ (using API of http://rate-exchange.appspot.com/)
- Save selected currencies and typed value in localStorage

Building
---

The `server` task in `gulpfile.js` relies on a Koa server. Koa currently requires node 0.11.x for the harmony flag. Launch this task with the following command:

```
node --harmony-generators `which gulp` serve
```

Roadmap
---

- Improve crossbrowser compatibility
- Reduce API calls
