import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios'
import vueRsource from 'vue-resource'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import md5 from 'js-md5';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

//Vue.prototype.$http = axios
Vue.config.productionTip = false;
Vue.use(VueCookies)
Vue.use(Vuex);
Vue.use(vueRsource, axios);
Vue.prototype.$md5 = md5;
Vue.use(ElementUI, {
    size: 'small'
});
/* 
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
}); */
//使用钩子函数对路由进行权限跳转 to（去向）我们要访问的路由  from（来源）路由从哪里跳转到哪里  next 下一步的选择
router.beforeEach((to, from, next) => {
    // console.log(to.path);
    if ($cookies.get('tokenpa') != null || to.path == '/login') { //判断tokenpa是否存在
        //console.log(123);
        let quan = sessionStorage.getItem('jurisdiction');
        if (to.meta.xian >= quan) {
            next();
        } else {
            next('/403');
        }
    } else {
        next('/login');
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');