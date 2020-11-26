var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://localhost:27017';
var db = null;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('blog');
    var myquery = { _id: ObjectId("5fa94e31d142ba29ef391d6c") };
    var newvalues = { $set: {title: "Mickey", content: "Canyon 123" } };
    dbo.collection("documents").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });