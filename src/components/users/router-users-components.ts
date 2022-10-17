export default (app)=>{
  return [
    {
      path: '/users',
      name: 'Users',
      component: import("./users-components.vue"),
      meta: {
        requireAuth: true,
        isRoot: false,
        sidebar: true,
        icon: 'groups',
        label:'Users'
      }
    }
  ]
}