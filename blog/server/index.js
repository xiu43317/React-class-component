var express = require('express');
var bodyParser = require('body-parser')
var db = require('./db');

var app = express();

// 有了這個才能透過 req.body 取東西
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 有了這個才能讓不同網址也拿到資料
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
  next();
})

// 直接輸出所有留言
app.get('/posts', function (req, res) {

  // 拿出所有的留言
  db.getPosts(function (err, posts) {
    if (err) {
      res.send(err);
    } else {
      res.send(posts.reverse());
    }
  })
});

// 刪除文章
app.get('/posts/delete/:id', function (req, res) {
  var id = req.params.id;
  db.deletePost(id, function (err) {
    if (err) {
      res.send({
        status: 'FAILURE',
        err: err
      });
    } else {

      // 成功後輸出成功
      res.send({
        status: 'SUCCESS'
      });
    }
  })
})

// 新增文章
app.post('/posts', function (req, res) {
  var title = req.body.title;
  var content = req.body.content;

  console.log(req.body);

  db.addPost({
    title: title,
    content: content,
    createTime: new Date(),
  }, function (err, data) {
    if(err) {
      res.send({
        status: 'FAILURE',
        err: err
      });
    } else {
      res.send({
        status: 'SUCCESS'
      });
    }
  })
})

app.post('/posts/update',function(req,res){
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
  db.updatePosts(id,{title:title,content:content},function(err,data){
    if(err) {
      res.send({
        status:'FAILURE',
        err: err
      });
    }else{
      res.send({
        status:'SUCCESS',
      });
    }
  })
})

db.connect(function (err) {
  if(!err) {
    app.listen(5566, function () {
      console.log('Example app listening on port 5566!')
    })
  }
})