var koa = require('koa');
var router = require('koa-router');
var Q = require('q');
var cheerio = require('cheerio');
var request = Q.denodeify(require('request'));

function doHttpRequest(url) {
  return request(url).then(function(resultParams) {
    return resultParams[0];
  });
}

var app = koa();

app.use(function *(next) {
  this.set('Access-Control-Allow-Origin', '*');
  yield next;
});

app.use(router(app));
app.get('/api/v1/:from/:to', rate);

function *rate(from, to) {
  var from = this.params.from.toUpperCase();
  var to = this.params.to.toUpperCase();

  var page = yield doHttpRequest('http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + from + '&To=' + to);
  var $ = cheerio.load(page.body);
  var rate = parseFloat($('.uccRes td:last-of-type').text());
  var date = new Date($('.uccMMR a').text());

  var response = {
    from: from,
    to: to,
    rate: rate,
    timestamp: date
  };

  this.body = JSON.stringify(response, null, 2);
}

app.listen(process.env.PORT || 3000);
