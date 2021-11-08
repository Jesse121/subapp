import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router";
import "./public-path";
import { createRouter, createWebHistory } from "vue-router";

const app = createApp(App);

let instance = null;

function render(props: any) {
	const { container } = props;
	const router = createRouter({
		history: createWebHistory(`/vue3-demo/`),
		routes
	});

	instance = createApp(App)
		.use(router)
		.mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
	render({});
}

/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
export async function bootstrap() {
	console.log("bootstrap");
}

/**
 * mount ： 在应用每次进入时调用
 */
export async function mount(props: any) {
	console.log("mount", props);
	render(props);
}

/**
 * unmount ：应用每次 切出/卸载 均会调用
 */
export async function unmount() {
	// console.log("unmount");
	// app.unmount();
}
