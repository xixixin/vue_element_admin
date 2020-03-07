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
let Student = mongoose.Schema({
    name: String,
    sex: String,
    age:Number,
    system:String,
    major: String,
    clas:String,
    market:String,
    chengji: Number,
    fail: Number
});
let StudentModel = mongoose.model('stu', Student);
// 添加学生
exports.addstudent = (item,callback) => {
    StudentModel.insertMany([item]).then(docs =>{
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
// 获取所有学生
exports.getAllStudent = (callback) => {
    StudentModel.find().then(docs => {
        if(docs.length == 0){
            result = {
                code:-1,
                msg:'没有找到学生数据'
            }
        }else{
            const data = []
            for(let i = 0;i<docs.length;i++){
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
// 删除学生
exports.deleteStudent=(id,callback)=>{
    StudentModel.remove({_id:id.id}).then(docs=>{
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

// 编辑学生
exports.editStudent = (id,callback) => {
    StudentModel.find({_id:id.id}).then(docs => {
        console.log(docs)
        callback(docs[0]._doc)
    })
}
// 确定编辑
exports.updataStu = (id,data,callback) => {
    StudentModel.update({_id:id},{$set:data}).then(docs => {
        console.log(docs)
        if(docs.n == 1){
            result = {
                code:0,
                msg:'编辑成功'
            }
        }else{
            result = {
                code:-1,
                msg:'编辑失败'
            }
        }
        callback(result)
    })
}
// 查询
exports.searchMsg = (val,callback) => {
    console.log(val)
    StudentModel.find(val).then(docs => {
        callback(docs)
    })
}

