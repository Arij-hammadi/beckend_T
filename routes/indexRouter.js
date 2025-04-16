var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});
router.get('/', function(req, res, next) {
  res.json('index');
});

router.get("/", (req, res) => {
  res.locals.data = "Page d'accueil envoyée";
  res.status(200).send("Bienvenue !");
});

module.exports = router;
