
import { createRouter, createWebHistory } from 'vue-router'
import routerLoader from './larasati-router-items.ts';
function router(app){
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routerLoader(app)
  })
}
export default router