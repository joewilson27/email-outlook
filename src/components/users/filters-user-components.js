import {ref} from 'vue';
export default ref([
  name: ref({
    key: 'name',
    type: 'text',
    label: 'Name',
    value: ref(null),
  }),
  age: ref({
    key: 'age',
    type: 'numberic',
    label: 'Age',
    value: ref(null)
  }),
  address: ref({
    key: 'address',
    type: 'textarea',
    label: 'Address',
    value: ref(null)
  })
])