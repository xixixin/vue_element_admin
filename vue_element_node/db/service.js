const db  = require('./db')
const headMaster = require('./headMaster')
const clas = require('./class')
const login = require('./login')
const user = require('./user')
const jwt = require('jsonwebtoken')
// 添加学生
exports.addstudentHandle = (req,res)=>{
    const body = req.body
    console.log(body)
    db.addstudent(body,result => {
        console.log(body)
        console.log(result)
        if(result.code == 0){
            res.json({
                msg:result.msg
            })
        }
    })
}
// 获取所有学生
exports.getAllStudentHandle = (req,res) => {
    db.getAllStudent(result => {
        const {code,data,msg} = result
        if(code == 0){
            res.json({
                data,msg
            })
        }
    })
}
// 删除学生
exports.deleteStudentHandle=(req,res)=>{
    let id = req.body;
    console.log(id)
    db.deleteStudent(id,result=>{ 
        console.log(result)
        const {code,msg} = result
        if(code == 0){
            res.json({
                msg
            })
        }
    })
}
// 编辑学生
exports.editorStuHandle=(req,res) => {
    // console.log(req.body)
    let id  = req.body
    db.editStudent(id,result => {
        // console.log(result)
        res.json({
            data:result
        })
    }) 
    
}
//确定编辑学生
exports.updateStudentHandle = (req,res) => {
    let id  = req.body.id
    console.log(req.body)
    db.updataStu(id,req.body,result => {
        res.json({
            msg:result.msg
        })
    })
}

// 添加班主任
exports.addHeadMasterHandle = (req,res)=>{
    let body = req.body
    console.log(body) 
    headMaster.addHeadMaster(body,result => {
        console.log(body)
        console.log(result)
        if(result.code == 0){
            res.json({
                msg:result.msg
            })
        }
    })
}
// 获取所有班主任
exports.getAllHeadMasterHandle = (req,res) => {
    headMaster.getAllHeadMaster(result => {
        const {code,data,msg} = result
        console.log(result)
        if(code == 0){
            res.json({
                data,msg
            })
        }
    })  
}
// 删除班主任
exports.deleteMasterHandle = (req,res) => {
    let id = req.body
    console.log(id)
    headMaster.deleteMaster(id,result => {
        console.log(result)
        const {code,msg} = result
        if(code == 0){
            res.json({
                msg
            })
        }
    })
}
// 添加班级
exports.addClassHandle = (req,res) => {
    let body = req.body
    console.log(body)
    clas.addClass(body,result => {
        if(result.code == 0){
            res.json({
                msg:result.msg
            })
        }
    })
}
// 获取所有班级
exports.getAllClassHandle = (req,res) => {
    clas.getAllClass(result => {
        const {code,msg,data} = result
        console.log(result)
        if(code == 0){
            res.json({
                data,msg
            })
        }
    })
}
// 删除班级
exports.deleteClassHandle = (req,res) => {
    let id = req.body
    console.log(id)
    clas.deleteClass(id,result => {
        console.log(result)
        const {code,msg} = result
        if(code == 0){
            res.json({
                msg
            })
        }
    })
}
// 编辑班级
exports.editorClassHandle = (req,res) => {
    let id = req.body
    clas.editorMaster(id,result => {
        res.json({
            data:result
        })
    })
}
// 查询
exports.searchHandle = (req,res) => {
    console.log(req.body)
    db.searchMsg(req.body.id,result => {
        if(result.length <0){
            res.send('没有符合条件的数据')
        }else{
            res.json(result)
        }
    })
}
// 获取查询用户是否存在于数据库
exports.userHandle = (req, res) => {
    let data = req.body;
    user.getUser(data, result => {
        if (result.length != 0) {
            res.json({
            code: 20000,
            data: {
                token: jwt.sign(
            {
                username: result[0].username,
                id: result[0]._id
            },  
            "abcd",
            {
                // 过期时间
                expiresIn: "1h"
            }
            )
            }
        });
        } else {
        res.json({
        code: 60204,
        message: "密码错误或者用户名不充在"
        });
        }
    });
    };
    
exports.loginHandle = (req, res) => {
// console.log(req.query.token)
jwt.verify(req.query.token, "abcd", function(err, decode) {
// console.log(decode);
    if (err) {
        res.json({
        code: 5005,
        data: "success",
        message: "用户未登录"
    });
    } else {
        let usernameId = decode.username + decode.id;
        login.getlogin(
        {
            usernameId
        },
        datas => {
        if (datas.length != 0) {
            // console.log(datas);
            res.json({
            code: 20000,
            data: {
                roles: [datas[0].username],
                introduction: `I am an ${datas[0].username}`,
                avatar: datas[0].imgUrl,
                name: `${datas[0].username}`,
                vip: `${datas[0].vip}`,
                token: jwt.sign(
                    {
                        username: datas[0].usernameId
                    },
                    "abcd",
                    {
                        // 过期时间
                        expiresIn: "1h"
                    }
                )
            }
            });
        } else {
            res.json({
                code: 50008,
                message: "登录失败"
            });
        }
    }
    );
    }
});
};
exports.loginoutHandle = (req, res) => {
    // 退出登录
    res.json({
    code: 20000,
    data: "success"
    });
};
    