<template>
  <q-header push elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleSiderLayout"
      />
      <q-toolbar-title class="text-weight-bolder" v-if="$route.name == 'DEFAULT'">
        DASHBOARD
      </q-toolbar-title>
      <q-toolbar-title  class="text-weight-bolder" v-else>
        {{$route.name}}
      </q-toolbar-title>
      <q-btn class="glossy" push style="margin-right:5px;" color="primary" round icon="notifications">
        <q-tooltip>Notifications</q-tooltip>
      </q-btn>
      <q-btn class="glossy" push color="primary" round>
        <q-tooltip>Account Settings</q-tooltip>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
        <q-menu transition-show="rotate"
          transition-hide="rotate">
          <div push elevated class="row no-wrap q-pa-md glossy bg-primary text-white shadow">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle label="Use Mobile Data" />
              <q-toggle label="Bluetooth" />
            </div>
            <q-separator vertical inset class="q-mx-lg" />
            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg">
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
              <q-btn
                color="primary"
                label="Logout"
                push
                v-on:click="$larasati.$auth.revokeauthentication(this)"
                v-close-popup
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
import { defineComponent,ref} from 'vue';
export default defineComponent({
  name:"HeaderLayouts",
  data(){
    return {
      leftDrawerOpen:ref(false)
    }
  },
  methods: {
    toggleSiderLayout() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
      this.$emit('collapse',this.leftDrawerOpen);
    }
  }
});
</script>