<template>
    <q-page class="tw-p-10">
        <div class="tw-flex tw-items-center tw-justify-between">
            <h1 class="tw-text-4xl  tw-font-medium tw-mb-2">Assign Roles</h1>
            <q-breadcrumbs class="font-manrope tw-text-sm tw-text-gray-400">
                <q-breadcrumbs-el label="Home" />
                <q-breadcrumbs-el label="Management" />
                <q-breadcrumbs-el label="Users" />
            </q-breadcrumbs>
        </div>

        <div class="tw-flex tw-space-x-5 tw-mt-5">

            <div class="tw-flex-1">
                <q-card flat class="tw-p-3">
                    <q-card-section class="tw-mb-2">
                        <div class="tw-text-xl">Available Roles</div>
                    </q-card-section>
                    <q-table
                        flat
                        dense
                        style="height: 400px"
                        selection="multiple"
                        virtual-scroll
                        v-model:selected="selectedAssign"
                        row-key="ID"
                        :rows="availableRows"
                        :columns="columns" 
                        :rows-per-page-options="[0]"
                    >

                        <template v-slot:body-cell-selection="props">
                            <q-checkbox v-model="props.selected" />
                        </template>
                    </q-table>
                </q-card>
            </div>

            <div class="tw-flex tw-flex-col tw-justify-center tw-space-y-3 tw-text-white">
                <button @click="confirmAssign" class="tw-bg-blue-500 tw-px-3 tw-py-2 tw-rounded">
                    <q-icon name="eva-arrowhead-right-outline" />
                </button>
                <button @click="confirmUnassign" class="tw-bg-red-500 tw-px-3 tw-py-2 tw-rounded">
                    <q-icon name="eva-arrowhead-left-outline" />
                </button>
            </div>

            <div class="tw-flex-1">
                <q-card flat class="tw-p-3">
                    <q-card-section class="tw-mb-2">
                        <div class="tw-text-xl">Assigned Roles</div>
                    </q-card-section>
                    <q-table
                        flat
                        dense
                        style="height: 400px"
                        selection="multiple"
                        virtual-scroll
                        v-model:selected="selectedUnassign"
                        row-key="ID"
                        :columns="columns"
                        :rows="assignedRows"
                        :rows-per-page-options="[0]"
                    >
                        <template v-slot:body-cell-selection="props">
                            <q-checkbox v-model="props.selected" />
                        </template>
                    </q-table>
                </q-card>
            </div>

        </div>

        <Confirm :open="dialogAssign.open" :title="dialogAssign.title" :message="dialogAssign.message">
            <q-btn flat label="Cancel" color="grey" @click="dialogAssign.open = false" />
            <q-btn flat label="Yeah, Sure" color="warning" @click="assignRoles" />
        </Confirm>

        <Confirm :open="dialogUnassign.open" :title="dialogUnassign.title" :message="dialogUnassign.message">
            <q-btn flat label="Cancel" color="grey" @click="dialogUnassign.open = false" />
            <q-btn flat label="Yeah, Sure" color="warning" @click="unassignRoles" />
        </Confirm>

    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Confirm from 'components/Confirmation.vue'

const columns = [
    {
        name: 'roles',
        align: 'left',
        label: 'Roles',
        field: row => row.Name || '-'
    },
]

export default defineComponent({
    components: {
        Confirm
    },
    setup() {
        return {
            columns,
            availableRows: ref([]),
            assignedRows: ref([]),
            selectedAssign: ref([]),
            selectedUnassign: ref([]),

            assignData: ref([]),
            unassignData: ref([])
        }
    },
    data() {
        return {
            dialogAssign: {
                open: false,
                title: "",
                message: ""
            },
            dialogUnassign: {
                open: false,
                title: "",
                message: ""
            }
        }
    },
    mounted() {
        this.getAssignedRoles()
    },
    methods: {
        getAssignedRoles() {
            let vm = this
            vm.$api.get("/users/" + this.$route.params.id).then((ress) => {
                vm.assignedRows = ress.data.data.Roles
                vm.getAvailableRoles()
            })
        },

        getAvailableRoles() {
            let vm = this
            vm.$api.get("/roles").then((ress) => {
                vm.availableRows = ress.data.data.filter((x) => {
                    return !vm.assignedRows.some((y) => {
                        return x.ID == y.ID
                    })
                })
            })
        },

        confirmAssign() {
            this.dialogAssign = {
                open: true,
                title: "Assign Roles",
                message: "Are you sure assign selected roles for this users?"
            }
        },

        confirmUnassign() {
            this.dialogUnassign = {
                open: true,
                title: "UnAssign Roles",
                message: "Are you sure unassign selected roles for this users?"
            }
        },

        assignRoles() {
            let vm = this
            vm.selectedAssign.forEach((item) => {
                vm.assignData.push({ user_id: parseInt(this.$route.params.id), role_id: item.ID })
            })

            vm.$api.post("/users/roles/assign", { roles: vm.assignData }).then((ress) => {
                vm.getAssignedRoles() // Refresh data
                vm.selectedAssign = ref([]) // Clear data
                vm.assignData = ref([]) // Clear data
                vm.dialogAssign.open = false
            }).catch((err) => {
                console.log(err.response)
            })
        },

        unassignRoles() {
            let vm = this
            vm.selectedUnassign.forEach((item) => {
                vm.unassignData.push({ user_id: parseInt(this.$route.params.id), role_id: item.ID })
            })

            vm.$api.post("/users/roles/unassign", { roles: vm.unassignData }).then((ress) => {
                vm.getAssignedRoles() // Refresh data
                vm.selectedUnassign = ref([]) // Clear data
                vm.unassignData = ref([]) // Clear data
                vm.dialogUnassign.open = false
            }).catch((err) => {
                console.log(err.response)
            })
        }
    }
})
</script>
