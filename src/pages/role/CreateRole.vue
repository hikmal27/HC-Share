<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold">Create Role</h1>
        </div>

        <div class="tw-flex tw-space-x-3 tw-mt-5 tw-px-4">
            <div class="tw-flex-1">
                <q-table dense style="height: 400px" :columns="columns" selection="multiple" v-model:selected="Selected" virtual-scroll :rows="rows" row-key="roles"  title="Available Roles" :rows-per-page-options="[0]">
                    <template v-slot:body-cell-selection="props">
                        <q-checkbox v-model="props.Selected" />
                    </template>
                </q-table>
            </div>
            <div class="tw-flex tw-flex-col tw-justify-center tw-space-y-3 tw-text-white">
                <button @click="kirim" class="tw-bg-blue-300 tw-px-3 tw-py-2">
                    <q-icon name="eva-arrowhead-right-outline" />
                </button>
                <button @click="tarik" class="tw-bg-red-300 tw-px-3 tw-py-2">
                    <q-icon name="eva-arrowhead-left-outline" />
                </button>
            </div>
            <div class="tw-flex-1">
                <q-table dense style="height: 400px" :columns="columnAssignment" selection="multiple" v-model:selected="SelectAssigment" virtual-scroll :rows="dataAssigment" row-key="roles"  title="Assigned Roles" :rows-per-page-options="[0]">
                    <template v-slot:body-cell-selection="props">
                        <q-checkbox v-model="props.Selected" />
                    </template>
                </q-table>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'checkbox',
    align: 'right',
    field: 'checkbox'
  },
  {
    name: 'roles',
    align: 'left',
    field: 'roles'
  },
]

const columnAssignment = [
  {
    name: 'checkbox',
    align: 'right',
    field: 'checkbox'
  },
  {
    name: 'roles',
    align: 'left',
    field: 'roles'
  },
]

const rows = [
  {
    roles: 'Add User'
  },
  {
    roles: 'Admin Accounting'
  },
  {
    roles: 'Admin Complain'
  },
  {
    roles: 'Admin Collection'
  },
  {
    roles: 'Admin EGC'
  },
  {
    roles: 'Admin Fidusia'
  },
  {
    roles: 'Admin IT'
  },
  {
    roles: 'Admin Marketing'
  },
  {
    roles: 'Admin Operational'
  },
  {
    roles: 'Admin Recruitment'
  },
  {
    roles: 'Admin Slik'
  },
  {
    roles: 'Admin Ticketing'
  },
]

export default defineComponent({
  setup() {
    return {
      columns,
      rows,
      columnAssignment,
      dataAssigment: ref([]),
      Selected: ref([]),
      SelectAssigment: ref([])
    }
  },
  methods: {
    kirim() {
      this.Selected.forEach(data => {
        this.dataAssigment.push(data)
      })
      this.Selected = []
    },

    tarik() {
      console.log('Tarik')
    },
  }
})
</script>
