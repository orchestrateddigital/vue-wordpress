import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "../assets/scss/main.css"

const app = createApp(App)
  .use(router)
  .use(store)

router.isReady().then(() => {
  app.mount('#vue-wordpress-app')
})
