export default (app)=>{
  return [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import("./dashboard-components.vue"),
    meta: { 
      requireAuth: true,
      isRoot:true
    }
  }
]
}