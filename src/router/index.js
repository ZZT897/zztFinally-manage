import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout/index';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import("@/views/frontend/index"),
            redirect: "/frontend",
        },
        {
            path: '/frontend',
            name: 'Frontend',
            component: () => import("@/views/frontend/index"),
            redirect:"warehouse",
            children: [
                {
                    path: '/warehouse',
                    name: '数据仓库',
                    component: () => import('@/views/frontend/WareHouse.vue')
                },
                {
                    path: '/community',
                    name: '数据社区',
                    component: () => import('@/views/frontend/Community.vue')
                },
                {
                    path: '/community/post',
                    name: '我要发贴',
                    component: () => import('@/views/frontend/Post.vue')
                },
                {
                    path: '/share',
                    name: '项目供需',
                    component: () => import('@/views/frontend/Share.vue')
                },
                {
                    path: '/share/need',
                    name: '发布需求',
                    component: () => import('@/views/frontend/Need.vue')
                },
                {
                    path: '/share/give',
                    name: '发布供给',
                    component: () => import('@/views/frontend/Give.vue')
                },
                {
                    path: '/share/person',
                    name: '个人空间',
                    component: () => import('@/views/frontend/Person.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("@/views/login/index"),
        },
        {
            path: '/userInfo',
            name: '用户管理',
            meta: { title: '用户管理', icon: 'el-icon-user-solid' },
            component: Layout,
            redirect: '/demostic',
            children: [
                {
                    path: '/demostic',
                    name: '普通用户',
                    component: () => import('@/views/backend/Demostic.vue'),
                    meta: { title: '普通用户', icon: 'el-icon-star-off' }
                },
                {
                    path: '/member',
                    name: '会员用户',
                    component: () => import('@/views/backend/Member.vue'),
                    meta: { title: '会员用户', icon: 'el-icon-star-on' }
                }
            ]
        },
        {
            path: '/dataInfo',
            name: '数据管理',
            meta: { title: '数据管理', icon: 'el-icon-s-data' },
            component: Layout,
            redirect: '/dataList',
            children: [
                {
                    path: '/dataList',
                    name: '数据列表',
                    component: () => import('@/views/backend/DataList.vue'),
                    meta: { title: '数据列表', icon: 'el-icon-document' },
                }
            ]
        },
        {
            path: '/needInfo',
            name: '需求管理',
            meta: { title: '需求管理', icon: 'el-icon-chat-line-square' },
            component: Layout,
            redirect: '/userNeed',
            children: [
                {
                    path: '/userNeed',
                    name: '用户需求',
                    component: () => import('@/views/backend/UserNeed.vue'),
                    meta: { title: '用户需求', icon: 'el-icon-user' },
                }
            ]
        },
        {
            path: '/communityInfo',
            name: '社区管理',
            meta: { title: '社区管理', icon: 'el-icon-house' },
            component: Layout,
            redirect: '/dataCommunity',
            children: [
                {
                    path: '/dataCommunity',
                    name: '数据社区',
                    component: () => import('@/views/backend/DataCommunity.vue'),
                    meta: { title: '数据社区', icon: 'el-icon-tickets' },
                },
                {
                    path: '/commentCommunity',
                    name: '评论社区',
                    component: () => import('@/views/backend/CommentCommunity.vue'),
                    meta: { title: '评论社区', icon: 'el-icon-chat-dot-round' },
                }
            ]
        },
        { path: '*', redirect: '/404', hidden: true }
    ]
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router