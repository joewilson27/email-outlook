export default (app)=>{
  return [
  {
    path: '/login',
    name: 'Login',
    component: import("./login-auth-component.vue"),
    meta: { 
      requireAuth: false,
      isRoot:false,
    }
  }
]
}