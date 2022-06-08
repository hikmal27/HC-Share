<template>
  <q-page>
    <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
      <h1 class="tw-text-2xl tw-font-semibold ">Permission</h1>
    </div>

    <div class="tw-w-48 tw-mt-2 tw-p-4">
      <router-link to="/setting/permission/create">
        <div class="tw-px-3 tw-py-3 tw-bg-white tw-rounded-sm tw-text-center">
          <p class="tw-text-xs tw-font-semibold">Create New</p>
        </div>
      </router-link>
    </div>

    <div class="tw-p-4">
      <div class="tw-w-full tw-p-3 tw-overflow-hidden tw-rounded-sm tw-bg-white">
        <div class="tw-w-full tw-overflow-x-auto">
          <table class="tw-w-full">
            <thead>
              <tr class="tw-text-xs tw-text-left tw-font-semibold tw-uppercase tw-text-gray-400 tw-bg-gray-50">
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Name</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Description</div>
                </th>
                <th class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-font-semibold tw-text-left">Action</div>
                </th>
              </tr>
            </thead>
            <tbody class="tw-text-sm tw-divide-y tw-divide-gray-100">
              <tr v-for="item in Permissions" :key="item.ID" class="tw-text-gray-700">
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-font-medium tw-text-gray-800">{{ item.Name }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-whitespace-nowrap">
                  <div class="tw-flex tw-items-center">
                    <div v-if="item.Description == ''" class="tw-font-medium tw-text-gray-800">Not found</div>
                    <div v-else class="tw-font-medium tw-text-gray-800">{{ item.Description }}</div>
                  </div>
                </td>
                <td class="tw-p-2 tw-space-x-2">
                  <router-link :to="'/setting/permissions/' + item.ID" class="tw-text-base tw-text-yellow-500"><q-icon name="eva-edit-outline"></q-icon></router-link>
                  <button class="tw-text-base tw-text-red-700" @click="confirmDelete(item.ID)">
                    <q-icon name="eva-trash-2-outline"></q-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <q-dialog v-model="Confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar>
            <q-icon name="eva-trash-2-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
          </q-avatar>
          <span class="q-ml-sm">You are sure you want to delete it?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deletePermission()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'permission',
  setup() {
    return {
      Permissions: ref([]),
      Id: ref(null),
      Confirm: ref(false)
    }
  },
  mounted() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      let vm = this

      vm.$api.get('/permissions')
        .then(ress => {
          // console.log(ress.data.data)
          let data = ress.data.data
          vm.Permissions = data
        })
        .catch(err => {
          console.log(err)
        })
    },

    confirmDelete(id) {
      this.Confirm = true
      this.Id = id
    },

    deletePermission() {
      let vm = this
      console.log(vm.Id)

      vm.$api.delete('/permissions/' + vm.Id + '/force')
        .then(ress => {
          // console.log(ress)
          if(ress.status == 200) {
            vm.$q.notify({
              message: 'Permission has been deleted!',
              color: 'negative'
            })
          } else {
            vm.$q.notify({
              message: 'Permission cant be deleted!',
              color: 'negative'
            })
          }
          vm.Confirm = false
          vm.getPermissions()
        })
        .catch(err => console.log(err))
    }
  }
})
</script>