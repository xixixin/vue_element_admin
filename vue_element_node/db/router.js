const express = require('express')
const service  = require('./service')
let router = express.Router()
// 查询
router.post('/searchMsg',service.searchHandle)
// 添加学生
router.post('/addstudent',service.addstudentHandle)  
// 获取所有学生
router.get('/getAllStudent',service.getAllStudentHandle)
// 删除学生
router.post('/deletestudent',service.deleteStudentHandle)
// 编辑学生
router.post('/editorStu',service.editorStuHandle)
router.post('/updateStudent',service.updateStudentHandle)
// 添加班主任
router.post('/addHeadMaster',service.addHeadMasterHandle)
// 班主任列表
router.post('/getAllHeadMaster',service.getAllHeadMasterHandle)
// 删除班主任
router.post('/deleteMaster',service.deleteMasterHandle)
// 添加班级
router.post('/addClass',service.addClassHandle)
// 班级列表
router.post('/getAllClass',service.getAllClassHandle)
// 删除班级
router.post('/deleteClass',service.deleteClassHandle)
// 编辑班级
router.post('/editorClass',service.editorClassHandle)
// 登陆
// router.post('/login',service.loginHandle)
// 获取用户名
router.post('/getUser',service.userHandle)
router.get('/getUserToken',service.loginHandle)
router.post('/loginout',service.loginoutHandle)
module.exports = router