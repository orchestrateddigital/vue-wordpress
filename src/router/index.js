import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const { url } = __VUE_WORDPRESS__.routing

// scroll position is handled in @after-leave transition hook
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

export default createRouter({
  // base: url.replace(window.location.origin, ''),
  history: createWebHistory(url.replace(window.location.origin, '')),
  routes: routes
})
