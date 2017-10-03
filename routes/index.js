var express = require('express');
var router = express.Router();
var mongo = require('../mongo')

let link = '';
let mssg = ' ';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'justshrink.me' , mssg : mssg});
});

router.post('/',function(req, res) {
let start = req.body.link.substring(0, 3);
console.log(start);
if(start === 'www') {
  link = `http://${req.body.link}`;
}
if(start === 'htt') {
  link = `${req.body.link}`;
}

if(start != 'www' && start != 'htt') {
  link = `http://${req.body.link}`;
}

mongo.newLink(req.body.id,link);
//var result = document.getElementById("result");

res.render('index');
 });

router.get('/:id' , (req,res)=> {
  var id = req.params.id;
  mongo.redirect(id).then(function(link) {res.redirect(link)}).catch(function() {res.send('does not exist')});
    //res.send(id);
}); 

module.exports = router;
