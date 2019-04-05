var express = require('express');

var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Source: https://oregonstate.instructure.com/courses/1674424/pages/watch-real-coding-displaying-data-using-nodejs?module_item_id=17928278
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));

app.set('mysql', mysql);

// Require js.
app.use('/trail', require('./trail.js'));
app.use('/contact', require('./contact.js'));
app.use('/user', require('./user.js'));
app.use('/review', require('./review.js'));
app.use('/location', require('./location.js'));



// Main routes.

app.get('/',function(req,res){
  res.render('index');
});

app.get('/index',function(req,res){
  res.render('index');
});

app.get('/contact',function(req,res){
  res.render('contact');
});

app.get('/location',function(req,res){
  res.render('location');
});

app.get('/review',function(req,res){
  res.render('review');
});

app.get('/trail',function(req,res){
  res.render('trail');
});

app.get('/user',function(req,res){
  res.render('user');
});

app.get('/update-contact',function(req,res){
  res.render('update-contact');
});

app.get('/update-trail',function(req,res){
  res.render('update-trail');
});

app.get('/update-user',function(req,res){
  res.render('update-user');
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
