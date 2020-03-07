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
let login = mongoose.Schema({
    usernameId:String,
    username: String,
    imgUrl:String,
    Vip:Number
});
let loginModel = mongoose.model('login', login);
// 登录
exports.getlogin = (data,callback) => {
   loginModel.find(data).then(docs => {
    //    console.log(docs)
      callback(docs)
   })
}


