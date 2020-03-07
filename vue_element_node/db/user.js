
// 引入 mongoose 操作模块
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/projects', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', function(){
    console.log('连接失败');
});
db.once('open', function() {
  console.log('连接成功');
});
// 创建构造函数
let user = mongoose.Schema({
    username: String,
    password:String
});
let userModel = mongoose.model('user', user);
exports.getUser = (data,callback) => {
    userModel.find(data).then(docs => {
      callback(docs)

   })
}


