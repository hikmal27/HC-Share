<template>
  <q-page class="tw-p-4">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Roles</h1>
    <hr>
    <q-btn unelevated color="orange-10" class="tw-my-3" :to="{name: 'create-role'}" text-color="white" label="Create New" />

    <q-table class="tw-w-full q-pa-none no-shadow no-border-radius"
    :rows="Roles"
    :columns="columns"
    row-key="ID"
    :loading="loading">
    <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="!tw-text-xs !tw-font-semibold tw-uppercase !tw-text-gray-400 !tw-bg-gray-50"
          >
          {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div>
            <router-link :to="{name: 'detail-role', params:{id: props.row.ID}}"><q-btn icon="edit" color="orange-10" dense flat/></router-link>
            <q-btn icon="delete" color="negative" @click="confirmDelete(props.row.ID)" dense flat />
          </div>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar>
            <q-icon name="eva-trash-2-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
          </q-avatar>
          <span class="q-ml-sm">You are sure you want to delete it?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="orange-10" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteRole()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

const columns = [
  { name: 'Name', align: 'left', label: 'Name', field: 'Name', sortable: true },
  { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
  { name: 'action', align: 'center', label: 'Action', sortable: false },
]
export default defineComponent({
  name: 'role',
  setup() {
    return {
      columns,
      Roles: ref([]),
      confirm: ref(false),
      id: ref(null),
      loading: ref(null)
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      let self = this
      self.loading = true 
      self.$api.get('/roles')
        .then(ress => {
          self.Roles = ress.data.data
          self.loading = false 
        })
        .catch(err => {
          console.log(err)
        })
    },

    confirmDelete(id) {
      this.confirm = true
      this.id = id
    },

    deleteRole() {
      let self = this
      self.loading = true
      self.confirm = false
      self.$api.delete('/roles/' + self.id)
        .then(ress => {
          self.$q.notify({
            message: 'Role has been deleted!.',
            type: 'positive'
          })
          
          self.loading = false
          self.getRoles()
        })
        .catch(err => console.log(err))
    }
  }
})
</script>