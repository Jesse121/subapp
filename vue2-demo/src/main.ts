import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";

Vue.config.productionTip = false;

let router = null;
let instance: any = null;

function render(props = {}) {
	const { container } = props as any;
	router = new VueRouter({
		// histroy模式的路由需要设置base，app-history-vue根据项目名称来定
		base: (window as any).__POWERED_BY_QIANKUN__ ? "/vue2-demo" : "/",
		mode: "history",
		// hash模式不需要上面两行
		routes: routes as any
	});

	console.log("主应用传递 props", props);
	instance = new Vue({
		router,
		render: h => h(App)
	}).$mount(container ? container.querySelector("#app") : "#app");
}
//全局变量来判断环境，独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
	render();
}

export async function bootstrap() {
	console.log("vue app bootstraped");
}

export async function mount(props: any) {
	console.log("props from main framework", props);
	render(props);
}

export async function unmount() {
	instance.$destroy();
	instance = null;
	router = null;
}
