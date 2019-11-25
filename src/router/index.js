import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { xian: '3' },
        },
        /* {
                    path: '/',
                    redirect: '/dashboard',
                    meta: {
                        requireAuth: true,
                    }
                }, */
        {
            path: '/',
            redirect: '/dashboard',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '首页', xian: '2' }, //修改标签属性

                },
                {
                    path: '/icon',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标', xian: '0' },

                },
                {
                    path: '/table',
                    component: () =>
                        import ( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格', xian: '1' }
                },
                {
                    path: '/tabs',
                    component: () =>
                        import ( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡', xian: '1' }
                },
                {
                    path: '/form',
                    component: () =>
                        import ( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单', xian: '0' }
                },

                {
                    // 客服组件
                    path: '/markdown',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: '客服', xian: '2' }
                },
                {
                    // 用户管理组件
                    path: '/AddManagement',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/ManagementSettings.vue'),
                    meta: { title: '管理设置', xian: '1' }
                },
                {
                    // 个人设置组件
                    path: '/PersonalSettings',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/PersonalSettings.vue'),
                    meta: { title: '个人设置', xian: '2' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () =>
                        import ( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传', xian: '0' }
                },




                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import ( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true, xian: '2' }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404', xian: '2' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403', xian: '2' }
                },

            ]
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
//路由守卫   to（去向）我们要访问的路由  from（来源）路由从哪里跳转到哪里  next 下一步的选择
/* router.beforeEach((to, from, next) => {
    let token=localStorage.getItem('token')
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (token) { // 判断本地是否存在access_token
          NProgress.start()//页面加载进度条开始
          next()
          console.log(1230);
        } else {
          // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
          next('/login')
          console.log(456);
        }
      } else {
        next()
        console.log(789);
      }
    })
    router.afterEach(() => {
        NProgress.done()//页面加载进度条结束
    }) */

/*  export const asyncRouterMap = [
     {
       path: '/permission',
       component: Layout,
       name: '权限测试',
       meta: { role: ['admin','super_editor'] }, //页面需要的权限
       children: [
       { 
         path: 'index',
         component: Permission,
         name: '权限测试页',
         meta: { role: ['admin','super_editor'] }  //页面需要的权限
       }]
     },
     { path: '*', redirect: '/404', hidden: true }
   ]; */


export default router;