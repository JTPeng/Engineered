import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store";
import "./config/rem";

// const router = new VueRouter({
//   routes,
//   mode: routerMode,
//   strict: process.env.NODE_ENV !== "production",
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition;
//     } else {
//       if (from.meta.keepAlive) {
//         from.meta.savedPosition = document.body.scrollTop;
//       }
//       return { x: 0, y: to.meta.savedPosition || 0 };
//     }
//   },
// });

createApp(App).use(store).use(router).mount("#app");
