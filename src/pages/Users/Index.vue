<template>
    <q-page class="tw-p-10">
        <div class="tw-flex tw-items-center tw-justify-between">
            <h1 class="tw-text-4xl  tw-font-medium tw-mb-2">Management Users</h1>
            <q-breadcrumbs class="font-manrope tw-text-sm tw-text-gray-400">
                <q-breadcrumbs-el label="Home" />
                <q-breadcrumbs-el label="Management" />
                <q-breadcrumbs-el label="Users" />
            </q-breadcrumbs>
        </div>
        
        <q-card flat class="tw-bg-white tw-p-5 tw-mt-10">
            <q-card-section class="q-pa-none tw-flex tw-items-center tw-justify-between tw-pb-5">
                <div class="tw-text-xl">List Users</div>
                <q-btn no-caps unelevated class="tw-my-3" :to="{name:'create-user'}" label="Create New" color="warning"/>
            </q-card-section>

            <q-card-section class="q-pa-none">
                <q-table
                    flat
                    bordered
                    class="tw-w-full tw-border-gray-100"
                    row-key="ID"
                    v-model:selected="selected"
                    selection="multiple"
                    :rows="users"
                    :columns="columns"
                    :loading="loading"
                >
                    
                    <!-- Header Slot -->
                    <template v-slot:header="props">
                        <q-tr :props="props">
                            <q-th class="!tw-text-sm tw-text-gray-400 !tw-bg-gray-50">
                                <q-checkbox size="30px" v-model="props.selected" color="grey-10"/>
                            </q-th>
                            <q-th
                                v-for="col in props.cols"
                                :key="col.name"
                                :props="props"
                                class="!tw-text-sm tw-text-gray-400 !tw-bg-gray-50"
                            >
                                {{ col.label }}
                            </q-th>
                        </q-tr>
                    </template>

                    <template v-slot:body-selection="scope">
                        <q-checkbox size="30px" v-model="scope.selected" color="grey-10"/>
                    </template>
                    
                    <!-- Body Slot -->
                    <template v-slot:body-cell-action="props">
                        <q-td :props="props">
                            <q-fab
                                unelevated
                                padding="xs"
                                v-model="props.action"
                                label-position="top"
                                icon="eva-more-vertical-outline"
                                direction="left"
                            >
                                <q-fab-action unelevated padding="5px" label-class="bg-grey-3 text-grey-8" external-label label-position="top" color="red" icon="eva-trash-2-outline" label="Delete" @click="confirmDelete(props.row.ID)"/>
                                <q-fab-action unelevated padding="5px" label-class="bg-grey-3 text-grey-8" external-label label-position="top" color="blue" icon="eva-edit-outline" label="Edit" :to="{name: 'detail-user', params:{id: props.row.ID}}"/>
                            </q-fab>
                        </q-td>
                    </template>

                    <!-- Loading Slot -->
                    <template v-slot:loading>
                        <q-inner-loading showing color="warning" />
                    </template>
                </q-table>
            </q-card-section>
        </q-card>

        <q-dialog v-model="confirm">
            <q-card class="tw-p-2" style="width:400px">
                <q-card-section>
                    <div class="tw-text-2xl font-reem-kufi tw-font-medium tw-mb-2">Delete User</div>
                    <span class="tw-text-gray-400 font-manrope">Are you sure want to delete this user? If you delete this user, you will permanently lost this user</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="grey" v-close-popup />
                    <q-btn flat label="Delete" color="negative" @click="onDelete()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

const columns = [
    { name: 'username', align: 'left', label: 'Username', field: 'Username', sortable: true },
    { name: 'name', align: 'left', label: 'Name', field: 'Name', sortable: true },
    { name: 'email', align: 'left', label: 'Email', field: 'Email', sortable: true },
    { name: 'created_at', align: 'left', label: 'Created At', field: 'CreatedAt', sortable: true },
    { name: 'action', align: 'center', label: 'Action', sortable: false },
]

export default defineComponent({
    name: 'list-user',
    setup() {
        return {
            columns,
            loading: ref(null),
            users: ref([]),
            selected: ref([]),
            confirm: ref(false),
            id: ref(null),
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.loading = true
            this.$api.get('/users').then((ress) => {
                this.users = ress.data.data
                this.loading = false
            }).catch((err) => {
                console.log(err.response)
            })
        },

        confirmDelete(id){
            this.confirm = true
            this.id = id
        },

        onDelete() {
            let vm = this 
            vm.loading = true
            vm.$api.delete('/users/' + this.id).then((ress) => {
                vm.$q.notify({
                    message: 'User has been deleted!.',
                    type: 'positive'
                })
                vm.confirm = false
                vm.loading = false
                vm.getUsers()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
})
</script>