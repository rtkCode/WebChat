import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import qs from 'qs';

import Index from '../views/Index.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import LogOut from '../views/LogOut.vue'
import ChatList from '../views/ChatList.vue'
import ChatView from '../views/ChatView.vue'
import ChatGroup from '../views/ChatGroup.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'

import token from '../token.js'
import global from "../global.js"

// DES
import TZDES from '../../public/js/DES/main.js'

Vue.use(VueRouter)
Vue.use(new VueSocketIO({
    debug: true,
    connection: global.baseAddress
}))

axios.defaults.headers.post['Content-Type'] = 'Content-Type:application/x-www-form-urlencoded; charset=UTF-8'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$token = token
Vue.prototype.$global = global
Vue.prototype.$DES = TZDES

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(), 
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

window.onresize = function () {
  	global.resizeContent();
}

const routes = [
  	{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn,
		meta: {
			requireLogout: true
		},
	},
	{
		path: '/register',
		name: 'SignUp',
		component: SignUp,
		meta: {
			requireLogout: true
		},
	},
	{
		path: '/logout',
		name: 'LogOut',
		component: LogOut,
	},
	{
		path: '/chatlist',
		name: 'ChatList',
		component: ChatList,
		meta: {
			requireAuth: true,
		},
	},
	{
		path: '/chatview',
		name: 'ChatView',
		component: ChatView,
		meta: {
			requireAuth: true,
		},
	},
	{
		path: '/chatgroup',
		name: 'ChatGroup',
		component: ChatGroup,
		meta: {
			requireAuth: true,
		},
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: {
			requireAuth: true,
		},
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound
	},
	{path:'*',redirect:'/404'}
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
  	if (to.meta.requireAuth) {
		if (token.getToken() == null) {
			next({
				name: 'LogIn', query: { message: "Login to complete this operation", from: to.path }
			});
		} else {
			axios({
				method: 'post',
				url: global.request("verifyToken"),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					"Authorization": "bearer " + token.getToken()
				},
				data: qs.stringify({
					token: token.getToken()
				})
			})
			.then(function (response) {
				if (response.data.code == 200) next();
				else next("/");
			})
			.catch(function (error) {
				if (error.response) {
					if (error.response.status == 401) {
						token.removeToken();
						next({ name: 'LogIn', query: { message: "Status expired, please login again", from: to.path } });
					}else console.log(error);
				} else console.log(error);
			});
    	}
	} else if (to.meta.requireLogout) {
		if (token.getToken() == "ée") next();
		else next({ name: 'LogOut', query: { from: to.path, to: from.path } });
	} else next();
})

export default router
