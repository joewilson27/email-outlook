import { ref } from 'vue'
import { defineStore } from 'pinia'
import "isomorphic-fetch";
import * as msal from "@azure/msal-browser";

let user = null;
var islogin = typeof localStorage.getItem("user") == 'string' || localStorage.getItem("user") != null;
if(islogin){
  user = JSON.parse(localStorage.getItem("user"));
}
var msalObject = null;
var msalConfig = {
    auth: {
        // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        clientId: "607cf335-f642-4f45-8986-31332a89d633",
        // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
        // authority: "https://login.microsoftonline.com/4533a8e1-8450-424e-a63e-43efb4e89564",
        // Full redirect URL, in form of http://localhost:3000
        redirectUri: "https://localhost:3003/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: { 
        loggerOptions: {  
            loggerCallback: (level, message, containsPii) => {  
                if (containsPii) {    
                    return;   
                }   
                switch (level) {    
                    case msal.LogLevel.Error:   
                        console.error(message);   
                        return;   
                    case msal.LogLevel.Info:    
                        console.info(message);    
                        return;   
                    case msal.LogLevel.Verbose:   
                        console.debug(message);   
                        return;   
                    case msal.LogLevel.Warning:   
                        console.warn(message);    
                        return;   
                } 
            } 
        } 
    }
  }
// if(!islogin){
  msalObject = new msal.PublicClientApplication(msalConfig);
  if(msalObject.getAllAccounts().length == 1){
    islogin = true;
    user = msalObject.getAllAccounts()[0];
    // localStorage.setItem('user',JSON.stringify(user));
  }
// }

export const authStores = defineStore('authStores', {
  state: () => ({
    user: ref(user),
    islogin: ref(islogin),
    app: ref({}),
    loginRequest:{
        scopes: ["User.Read"]
    },
    tokenRequest:{
        scopes: ["User.Read", "Mail.Read"],
        forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
    },
    graphConfig:{
        graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
        graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages"
    },
    msalConfig:msalConfig,
    azureAccount:msalObject,
  }),
  actions: {
    async handleResponseAzure(response){
      if (response !== null) {
          this.islogin = true;
          this.user = response.account;
          // localStorage.setItem('user',JSON.stringify(this.user));
          // showWelcomeMessage(username);
          return this.app.goToComponent('DEFAULT');
      } else {
          this.islogin = false;
          this.user = null;
          return await this.selectAccountAzure();
      }
    },
    async authenticationAzure(){
      if(this.islogin == false){
        this.azureAccount = new msal.PublicClientApplication(this.msalConfig);
        this.azureAccount.handleRedirectPromise()
        .then(this.handleResponseAzure)
        .catch((error) => {
            console.error(error);
        });
      }
      if(this.azureAccount != null){
        await this.azureAccount.loginPopup(this.loginRequest)
        .then(this.handleResponseAzure)
        .catch(error => {
            console.error(error);
        });
      }

    },
    async selectAccountAzure(){
      const currentAccounts = this.azureAccount.getAllAccounts();
      if (currentAccounts.length === 0) {
          this.user = null;
          this.islogin = false;
          return;
      } else if (currentAccounts.length > 1) {
          this.user = null;
          this.islogin = false;
          // Add choose account code here
          console.warn("Multiple accounts detected.");
          return;
      } else if (currentAccounts.length === 1) {
          this.islogin = true;
          this.user = currentAccounts[0];
      }
    },
    setApp(app){
      this.app = ref(app);
    },
    async isAuthenticated(){
      this.islogin = typeof localStorage.getItem("user") == 'string' || localStorage.getItem("user") != null;
      if(this.islogin){
        this.user = JSON.parse(localStorage.getItem("user"));
      }
      return this.islogin;
    },
    async authentication(app){
      this.user = {
        name:'Admin',
        email:'admin@localhost.dev',
        uuid:'192830129-1239081023-12938102938',
        token: '29340198273401928734021937413n410293y12093yx01y3103y1932yn109nycx1923nyxc1092ny3xc10983'
      }
      await localStorage.setItem('user',JSON.stringify(this.user));
      this.islogin = true;
      return app.$larasati.goToComponent('DEFAULT');
    },
    async revokeauthentication(app){
      if(this.azureAccount != null){
        const logoutRequest = {
          account: this.azureAccount.getAccountByUsername(this.user.username)
        };
        this.azureAccount.logoutPopup(logoutRequest);
      }
      await localStorage.clear();
      this.islogin = false;
      this.user = null;
      return app.$larasati.goToComponent('Login');
    }
  }
});