<template>
  <q-page pading style="background-color:#FFF;">
    <div class="q-pa-md">
      <q-table
        dense
        :title="$route.name"
        :rows="response.data"
        :columns="response.collumns"
        class="shadow-10"
        v-model:pagination="response.pagination"
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
        :max="response.pagination.rowsPerPage"
      />
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
export default defineComponent({
  data(){
    return {
      response:{
        pagination:{
          page:1,
          sortBy: 'desc',
          descending: false,
          rowsPerPage:10,
        },
        page:1,
        per_page:10,
        current_page:1,
        data:[],
        total:10,
        columns:[
          {
            name: 'id',
            required: true,
            label: 'ID',
            field: 'id',
            sortable: true
          },
          {
            name: 'name',
            required: true,
            label: 'Name',
            field: 'name',
            sortable: true
          },
          {
            name: 'age',
            required: true,
            label: 'Age',
            field: 'age',
            sortable: true
          },
          {
            name: 'address',
            required: true,
            label: 'Address',
            field: 'address',
            sortable: true
          }
        ]
      },
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
      for(var i=0; i < this.response.per_page; i++){
        this.response.data.push({
          id:(this.response.per_page - i),
          name:faker.name.fullName(),
          age:faker.datatype.number({ min: 10, max: 60 }),
          address:faker.address.city(),
        });
      }
    }
  }
});
</script>

