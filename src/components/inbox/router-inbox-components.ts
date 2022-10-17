export default (app)=>{
  return [
    {
      path: '/inbox',
      name: 'Inbox',
      component: import("./inbox-components.vue"),
      meta: {
        requireAuth: true,
        isRoot: false,
        sidebar: true,
        icon: 'message',
        label:'Inbox'
      }
    }
  ]
}