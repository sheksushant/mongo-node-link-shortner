var MongoClient = require('mongodb').MongoClient;


var newLink = function(id,link){
var url = 'mongodb://localhost:27017/justshrinkme';
MongoClient.connect(url, function(err, db) {
//console.log("Connected correctly to server");

insertlink(id,link,db, function() {
        db.close();
});
});
}

var redirect = function(id){
  return new Promise((resolve, reject) => {
  var url = 'mongodb://localhost:27017/justshrinkme';
  MongoClient.connect(url, function(err, db) {
  //console.log("Connected correctly to server");
  
  var collection = db.collection('documents');
  collection.findOne({"id":id}, function(err, doc) {
    if(doc === null){
     // console.log('notset');
      reject();
    }
     else{
       //console.log(doc.link);
    resolve(doc.link);
    }
  });
          db.close();

  });

});
}

var insertlink = function(id,link,db, callback) {
    // Get the documents collection 
    var collection = db.collection('documents');
    // Insert some documents 
    collection.insertMany([
      {"id" : id, "link": link}
    ], function(err, result) {
      console.log("Inserted");
     // callback(result);
    });
  }

  var redirectlink = function(id,db, callback) {

  }
//redirect('sushant').then(function(res,err){console.log(res)}).catch(function(){console.log('doesnotexist');});
  module.exports = {newLink,redirect};