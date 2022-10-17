<template>
  <q-drawer class="shadow-5 bg-primary inset-shadow"
      :mini='collapse'
      :width="getWidth"
      show-if-above
      bordered
  >
    <div class="logo bg-primary inset-shadow">
      <img v-if="!collapse" class="full-width"
          style="height: 36px; margin-top: 7px;" 
          alt="Larasati logo"
          src="@/assets/psd/larasati-logo-side.png"
        >
      <img style="margin-bottom: -6px;" 
          alt="Larasati logo"
          src="@/assets/psd/larasati-icon-sm.png"
          v-else
        >
    </div>

    <q-list >
      <q-item 
        class="glossy"
        v-on:click="$larasati.goToComponent('DEFAULT')"
        :active="'DEFAULT' == $route.name"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-icon color="white" name="dashboard" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-white text-weight-bold">DASHBOARD</q-item-label>
          <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
        </q-item-section>
        <q-tooltip v-if="collapse" 
          transition-show="rotate"
          transition-hide="rotate"
        >
          DASHBOARD
        </q-tooltip>
      </q-item>
      <q-item
        class="glossy"
        v-for="(menu,imenu) in menuitems" 
        v-on:click="$larasati.goToComponent(menu.name)"
        clickable v-ripple
        :active="menu.name == $route.name"
      >
        <q-item-section avatar>
          <q-icon color="white" :name="menu.meta.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white text-weight-bold">{{menu.meta.label.toUpperCase()}}</q-item-label>
        </q-item-section>
        <q-tooltip v-if="collapse"
          transition-show="rotate"
          transition-hide="rotate"
        >
          {{menu.meta.label.toUpperCase()}}
        </q-tooltip>
      </q-item>

    </q-list>
  </q-drawer>
</template>
<style>
  @import "./layouts.css";
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props:{
    propcollapse:{
      require:true,
      type: Boolean,
      default: false
    }
  },
  computed: {
    menuitems () {
      var menus = this.$router.options.routes[0].children;
      var result = [];
      for(var i = 0;i< menus.length;i++){
        if(menus[i].meta != undefined){
          if(menus[i].meta.sidebar){
            delete menus[i].component;
            result.push(menus[i]);
          }
        }
      }
      menus = null;
      return result;
    },
    getWidth(){
      var win = window.screen.availWidth;
      return Math.floor((win*15) / 100)
    }
  },
  watch: {
    '$router.currentRoute.value.path': (val, oldVal) => {
      
    },
    '$router.currentRoute.value.name': (val, oldVal) => {
      
    },
    propcollapse(x){
      this.collapse = x;
    }
  },
  data() {
    return {
      collapse: ref(this.propcollapse)
    };
  },
  methods: {
    
  }
});
</script>