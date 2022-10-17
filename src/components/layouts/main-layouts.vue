<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderLayouts @collapse="sidercolapse"/>

    <q-footer elevated>
      <q-toolbar>
        <div>{{$larasati.$info.name}} v{{ $larasati.$info.version }}</div>
      </q-toolbar>
    </q-footer>

    <SiderLayouts :propcollapse="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent,defineAsyncComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    SiderLayouts: defineAsyncComponent(()=>import("./sider-layouts.vue")),
    HeaderLayouts: defineAsyncComponent(()=>import("./header-layouts.vue"))
  },
  watch:{
    leftDrawerOpen(x){}
  },
  mounted(){},
  data(){
    return {
      leftDrawerOpen:ref(false)
    }
  },
  methods:{
    sidercolapse(x){
      this.leftDrawerOpen = x;
    }
  }
})
</script>
