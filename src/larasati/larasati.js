import { authStores } from '../components/auth/storage-auth-components'; 
import { Quasar } from 'quasar'
import LS_STORAGES from './larasati-storages';
import LARASATIROUTERS from './larasati-routers';
import LARASATIPACKAGE from '../../package.json';
// import LARASATIFILTERS from './larasati-filters.js';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass';

class Larasati{
  constructor(app, options) {
    // this.$filters = LARASATIFILTERS;
    this.$app = app;
    this.$info = LARASATIPACKAGE;
    this.options = options;
    this.$auth = authStores()
    this.$auth.setApp(this);
    this.$LS_ROUTERS = LARASATIROUTERS(this);
    this.$LS_ROUTERS.beforeEach(async(to, from, next) => {
      if (to.meta.requireAuth === true && this.$auth.islogin === false) {
        await this.$auth.isAuthenticated().then(()=>{
          if(this.$auth.islogin === false){
            return next({ name: "Login" });
          }else{
            return next();
          }
        }).catch((e)=>{
          console.log(e);
        });
      } else if (to.name === "Login" && this.$auth.islogin === true) {
        return next({ name: "DEFAULT" });
      } else {
        return next();
      }
    });
  }
  async goToComponent(x,q) {
    return await this.$LS_ROUTERS.push({name:x,query:q}).then((res)=>{}).catch(()=>{});
  }
}
export default {
  install(app, options){
    app.config.globalProperties.$larasati = (new Larasati(app,options));
    app.use(app.config.globalProperties.$larasati.$LS_ROUTERS);
    app.use(Quasar);
  }
}