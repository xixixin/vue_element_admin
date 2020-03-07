// 引入 mongoose 操作模块
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/projects', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', function(){4
    console.log('连接失败');
});
db.once('open', function() {
  console.log('连接成功');
});
// 创建构造函数
let clas = mongoose.Schema({
    name: String,
    date:String,
    teacher:String,
    headMaster:String
});
let classModel = mongoose.model('clas', clas);
// 创建班级
exports.addClass = (item,callback) => {
    classModel.insertMany([item]).then(docs => {
        if(docs.lrngth == 0){
            result = {
                code:-1,
                msg:'添加失败'
            }
        }else{
            result = {
                code:0,
                msg:'添加成功'
            }
        }
        callback(result)
    })
}
// 获取所有班级
exports.getAllClass = (callback) => {
    classModel.find().then(docs => {
        if(docs.length == 0){
            result = {
                code:-1,
                msg:'没有找到班级数据'
            }
        }else{
            const data = []
            for(let i = 0;i<docs.length;i++){
                docs[i]._doc.date = new Date(docs[i]._doc.date).toLocaleString().split(' ')[0]
                data.push(docs[i]._doc)
            }
            result = {
                code:0,
                msg:'找到啦',
                data
            }
        }
        callback(result)
    })
}
// 删除班级
exports.deleteClass = (id,callback) => {
    classModel.remove({_id:id.id}).then(docs => {
        console.log(docs)
        if(docs.n == 1){
            result = {
                code:0,
                msg:'删除成功'
            }
        }else{
            result = {
                code : -1,
                msg:'删除失败'
            }
        }
        callback(result)
    })
}