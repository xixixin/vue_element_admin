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
let headMaster = mongoose.Schema({
    name:String,
    sex:String,
    college:String,
    entryData:String
});
let headMasterModel = mongoose.model('master', headMaster);
// 添加班主任
exports.addHeadMaster = (item,callback) => {
    headMasterModel.insertMany([item]).then(docs =>{
        if(docs.length == 0){
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
// 班主任列表
exports.getAllHeadMaster = (callback) => {
    headMasterModel.find().then(docs => {
        if(docs.length == 0){
            result = {
                code:-1,
                msg:'没有找到班主任相关信息'
            }
        }else{
            const data = []
            for(let i = 0;i<docs.length;i++){
                docs[i]._doc.entryData = new Date(docs[i]._doc.entryData).toLocaleString().split(' ')[0]
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
// 删除班主任
exports.deleteMaster=(id,callback)=>{
    headMasterModel.remove({_id:id.id}).then(docs=>{
        console.log(docs);
        if(docs.n==1){
            result = {
                code: 0,
                msg:'删除成功'
            }
        }else{
            result = {
                code: -1,
                msg:'删除失败'
            }
        }
        callback(result)
    })
}
// 编辑班主任
exports.editorMaster = (id,callback) => {
    headMasterModel.find({_id:id.id}).then(docs => {
        console.log(docs)
        callback(docs[0]._doc)
    })
}
