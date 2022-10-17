<template>
  <q-page pading style="background-color:#FFF;">
    <div class="q-pa-md">
      <q-table
        dense
        :title="$route.name"
        :rows="response.data"
        :columns="response.collumns"
        :pagination.sync="pagination"
        class="shadow-10"
        flat
        bordered
      >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      </q-table>
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </div>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="response.current_page"
        color="grey-8"
        size="sm"
        :max="response.totalpage"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
import * as msal from "@azure/msal-browser";
export default defineComponent({
  data(){
    return {
      pagination:{
        rowsPerPage: 0 
      },
      response:{
        page:1,
        per_page:10,
        current_page:1,
        data:[],
        total:0,
        totalpage:0,
        columns:[
          {
            name: 'subject',
            required: true,
            label: 'Subject',
            field: 'subject',
            sortable: true
          },
          {
            name: 'bodyPreview',
            required: true,
            label: 'Preview',
            field: 'bodyPreview',
            sortable: true
          },
          {
            name: 'from',
            required: true,
            label: 'From',
            field: 'from',
            sortable: true
          }
        ]
      },
      tokenRequest:ref({
        scopes: ["User.Read", "Mail.Read","Mail.Send"],
        forceRefresh:false,
        account:null
      })
    }
  },
  mounted(){
    this.getData()
  },
  watch: {
    "response.current_page"(){
      console.log(typeof this.response.current_page);
      this.getData();
    }
  },
  methods: {
    getTokenPopup(request){
      request.account = this.$larasati.$auth.user;
      return this.$larasati.$auth.azureAccount.acquireTokenSilent(request)
          .catch(error => {
              console.log(error);
              console.warn("silent token acquisition fails. acquiring token using popup");
              if (error instanceof msal.InteractionRequiredAuthError) {
                  // fallback to interaction when silent call fails
                  return this.$larasati.$auth.azureAccount.acquireTokenPopup(request)
                      .then(tokenResponse => {
                          console.log(tokenResponse);
                          return tokenResponse;
                      }).catch(error => {
                          console.error(error);
                      });
              } else {
                  console.warn(error);   
              }
      });
    },
    callMSGraph(endpoint, token, callback) {
        const headers = new Headers();
        const bearer = `Bearer ${token}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        console.log('request made to Graph API at: ' + new Date().toString());

        fetch(endpoint, options)
            .then(response => response.json())
            .then(response => callback(response, endpoint))
            .catch(error => console.log(error));
    },
    setDataResponse(data, endpoint){
      this.response.totalpage = parseInt(Math.floor(data['@odata.count'] / this.response.per_page));
      this.response.total = data['@odata.count'];
      this.response.data = [];
      for(var i=0; i < data.value.length; i++){
        this.response.data.push({
          subject:data.value[i].subject,
          bodyPreview:data.value[i].subject,
          from:data.value[i].from,
        });
      }
    },
    getData(){
      var skip = this.response.current_page *  this.response.per_page;
      if(skip == this.response.per_page){
        skip =""
      }else{
        skip ="&skip="+skip;
      }
      return this.getTokenPopup(this.tokenRequest)
      .then(response => {
          this.callMSGraph("https://graph.microsoft.com/v1.0/me/messages/?$top="+this.response.per_page+"&$count=true"+skip, response.accessToken, this.setDataResponse);
      }).catch(error => {
          console.error(error);
      });
    }
  }
});
</script>

