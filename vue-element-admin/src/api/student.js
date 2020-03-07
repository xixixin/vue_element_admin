// 操作学生数据 铜鼓axios获取
import axios from 'axios'
const url = "http://localhost:3300"
// 导出
// 添加学生
export const addstudent = (studentItem) => {
    return axios.post(url + '/addstudent',{...studentItem})
}
// 所有学生
export const getAllStudent = () => {
    return axios.get("http://localhost:3300/getAllStudent")
}
// 删除学生
export const deleteStudent=(id)=>{
    return axios.post('http://localhost:3300/deletestudent',{id})
}
// 编辑学生
export const editorStu = (id) => {
    return axios.post('http://localhost:3300/editorStu',{id})
}
// 确定编辑
export const updateStudent = (id,data) => {
    return axios.post('http://localhost:3300/updateStudent',{id,...data})
}
// 添加班主任
export const addHeadMaster = (masterItem) => {
    return axios.post("http://localhost:3300/addHeadMaster",{...masterItem})
} 
// 班主任列表
export const getAllHeadMaster = () => {
    return axios.post("http://localhost:3300/getAllHeadMaster")
} 
// 删除班主任
export const deleteMaster = (id) => {
    return axios.post("http://localhost:3300/deleteMaster",{id})
}
// 添加班级
export const addClass = (classId) =>{
    return axios.post("http://localhost:3300/addClass",{...classId})
}
// 获取班级列表
export const getAllClass = () => {
    return axios.post('http://localhost:3300/getAllClass')
}
// 删除班级
export const deleteClass = (id) => {
    return axios.post("http://localhost:3300/deleteClass",{id})
}
// 编辑班级
export const editorClass = (id) => {
    
    return axios.post("http://localhost:3300/editorClass",{id})
}
// 查询lg
export const searchMsg = (id) => {
    console.log(id)
    return axios.post("http://localhost:3300/searchMsg",{id})
}
// 下载
export const stuPage = () => {
    return axios.post("http://132.232.89.22:8080/allstudentPage",{
        "page":1,
        "pageSize":1
    })
}