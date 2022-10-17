import routerauthcomponent from '../components/auth/router-auth-components.ts';
import routerdashboardscomponent from '../components/dashboards/router-dashboards-components.ts';
import routeruserscomponent from '../components/users/router-users-components.ts';
import routerinboxcomponent from '../components/inbox/router-inbox-components.ts';

import MainLayout from '../components/layouts/main-layouts.vue'

export default function LARASATIROUTEITEMS(app){
  var routers = [
    ...routerauthcomponent(app),
    ...routerdashboardscomponent(app),
    ...routeruserscomponent(app),
    ...routerinboxcomponent(app)
  ];
  var root = null;
  var children = [];
  var publicroot = [];
  for(var i = 0;i< routers.length;i++){
    if(routers[i].meta.isRoot == true && routers[i].meta.requireAuth == true){   
      root = routers[i];
    }else if(routers[i].meta.requireAuth == true){
      children.push(routers[i])
    }else{
      publicroot.push(routers[i])
    }
    delete routers[i];
  }
  if(root != null){
    children.push({
      path: '/',
      name: 'DEFAULT',
      component: root.component,
      meta: root.meta,
    });
    var nonpublic = 
    [{
      path: '/',
      name: 'ROOT',
      component: MainLayout,
      meta: root.meta,
      children: children,
    }];
  }
  return [...nonpublic,...publicroot];
}
