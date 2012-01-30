
/**
 * Module dependencies.
 */

require('./service/response'); // le module qui gère les entêtes json en retour en fonction du code d'erreur

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();
var mongoose = require('mongoose');
var md = require("markdown").markdown;

// connection globale à la base MongoDb
mongoose.connect('mongodb://localhost/test');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('public', __dirname + '/public');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var CategoriesRoutes = require('./routes/CategoriesRoute.js')(app);

// global variables

global.PublicDirectory = __dirname + '/public';
// Routes

app.get('/md/:document', function(req, res) {
    var fs = require("fs");
    var str = fs.readFileSync(global.PublicDirectory + "/documents/" + req.param("document"), "utf8");
    var result = str;
    res.send(md.toHTML(result));
});

app.get('/', routes.index);


if (module.parent === null) {
    app.listen(3000);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}