import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/User',
    component: Layout,
    redirect:'/User/UserList',
    name:'管理员',
    meta:{
      title:'用户',
      icon:'table'
    },
    children: [
      {
        path: '/User/index',
        component: () => import('@/views/User/index'),
        name: '创建管理员',
        meta: { title: '创建管理员', icon: 'documentation', affix: true , roles: [ "管理员", "超级管理员" ]}
      },
      {
        path: '/UserList',
        component: () => import('@/views/User/UserList'),
        name: '管理员列表',
        meta: { title: '管理员列表', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/Class',
    component: Layout,
    redirect: '/Class/ClassList',
    name: '班级',
    meta: {
      title: '班级',
      icon: 'table'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/Class/ClassList'),
        name: '班级列表',
        meta: { title: '班级列表' }
      },
      {
        path: '/Establish',
        component: () => import('@/views/Class/EstablishList'),
        name: '创建班级',
        meta: { title: '创建班级', roles: [ "管理员", "超级管理员" ] }
      }
    ]
  },
  {
    path: '/StudentOperation',
    component: Layout,
    redirect: '/StudentOperation/AllStudents/index',
    name: 'Students',
    meta: { 
      title: '学生操作',
      icon: 'nested'
    },
    children: [
      {
        path: '/AllStudents',
        component: () => import('@/views/StudentOperation/AllStudents/index'), // Parent router-view
        name: '所有学生',
        meta: { title: '所有学生' }
      },
      {
        path: '/AddStudent/index',
        name: '添加学生',
        component: () => import('@/views/StudentOperation/AddStudent/index'),
        meta: { title: '添加学生' , roles: [ "管理员", "超级管理员"]}
      },
      {
        path: '/allStudent',
        name: '新的所有学生',
        component: () => import('@/views/StudentOperation/allStudent'),
        meta: { title: '新的所有学生' , roles: [ "管理员", "超级管理员"]}
      },
      {
        path: '/AddStudent/upload',
        name: '上传文件',
        component: () => import('@/views/StudentOperation/AllStudents/upload-excel.vue'),
        meta: { title: '上传文件' , roles: [ "管理员", "超级管理员"]}
      }
    ]
  },
  { 
    path: '/Headmaster',
    component: Layout,
    redirect: '/Headmaster/HeadmasterList',
    name: '班主任',
    meta: {
      title: '班主任',
      icon: 'example'
    },
    children: [
      {
        path: '/HeadmasterList',
        component: () => import('@/views/Headmaster/HeadmasterList/index'),
        name: 'HeadmasterList',
        meta: { title: '班主任列表', icon: 'edit' }
      },
      {
        path: '/AddHeadmaster',
        component: () => import('@/views/Headmaster/AddHeadmaster/index'),
        name: 'AddHeadmaster',
        meta: { title: '添加班主任', icon: 'list' , roles: [ "管理员" ,"超级管理员"]}
      }
    ]
  },
  {
    path: '/Market',
    component: Layout,
    children: [
      {
        path: '/Market/index',
        component: () => import('@/views/Market/index'),
        name: '市场部',
        meta: { title: '市场部', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/Teacher',
    component: Layout,
    children: [
      {
        path: '/Teacher/index',
        component: () => import('@/views/Teacher/index'),
        name: '讲师',
        meta: { title: '讲师', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/Major/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Major'),
        name: '专业',
        meta: { title: '专业', icon: 'documentation', affix: true }
      }
    ]
  },
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
