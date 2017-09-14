var express = require('express');
var router = express.Router();
var mongo = require('../mongo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'justshrink.me' });
});

router.post('/',function(req, res) {
 console.log(req.body);
 mongo.newLink(req.body.id,req.body.link);
 res.render('index');
 });

 router.get('/:id' , (req,res)=> {
  var id = req.params.id;
  mongo.redirect(id).then(function(link) {res.redirect(link)}).catch(function() {res.send('does not exist')});
    //res.send(id);
}); 

module.exports = router;
