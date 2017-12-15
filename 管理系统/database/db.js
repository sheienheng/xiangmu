var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/demo',{useMongoClient:true});
db.on('error',function(){
})
db.once('open',function(){
    console.log('连接数据库成功,并打开数据库')
})
var Schema = mongoose.Schema;
var user = new Schema({
    name: String,
    password: String
})
var people = new Schema({
    Pname:String,
    Name:String,
    Age:Number,
    Phone:Number,
    Email:String,
    time:String
})
exports.user = db.model('users', user);
exports.people = db.model('peoples',people);