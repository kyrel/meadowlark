var express = require('express');
var fortunes = require('./services/fortunes');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout: 'main', extname: '.html' });
app.engine('.html', handlebars.engine);
app.set('view engine', '.html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function (request, response, next) {
    response.locals.showTests = app.get('env') !== 'production' && request.query.test === '1';
    next();
});

app.get('/', function (request, response) {
    response.render('home');
});

app.get('/about', function (request, response) {
    response.render('about', { fortune: fortunes.getFortune(), pageTestScript: '/qa/tests-about.js' });
});

app.get('/tours/hood-river', function (request, response) {
    response.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (request, response) {
    response.render('tours/request-group-rate');
});

app.use(function (request, response, next) {
    response.status(404);
    response.render('404');
});

app.use(function (err, request, response, next) {
    console.error(err.stack);
    response.status(500);
    response.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});