<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Create Role</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-border no-shadow no-border-radius">
            <q-card-section>
                <form @submit.prevent="editRole" class="tw-full">
                    <div class="tw-flex tw-flex-row">
                        <div class="tw-flex tw-flex-1 tw-flex-col tw-flex-wrap tw--mx-3 tw-mb-6">
                            <div class="tw-w-full tw-px-3 tw-mb-6 md:tw-mb-0">
                                <q-input v-model="Name" type="text" color="orange-10" label="Name" />
                            </div>
                            <div class="tw-w-full tw-px-3 tw-mt-5">
                                <q-input v-model="Description" type="text" color="orange-10" label="Description" />
                            </div>
                        </div>
                        <div class="tw-flex-1 tw-px-2 tw-bg-white tw-rounded-sm">
                            <div class="tw-flex"> 
                                <q-tree
                                    color="orange-10"
                                    class="tw-w-full"
                                    :nodes="Menus"
                                    v-model:ticked="ticked"
                                    node-key="id"
                                    :tick-strategy="tickStrategy"
                                    default-expand-all
                                />
                                <!-- <div>
                                    <h1>Ticked</h1>
                                    <p v-for="tick in ticked" :key="`ticked-${tick}`">{{ tick }}</p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-end tw-space-x-2">
                        <q-btn outline color="orange-10" :to="{name: 'index-role'}" label="Cancel" />
                        <q-btn color="orange-10" unelevated type="submit" text-color="white" label="Submit" />
                    </div>
                </form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'edit-role',
    setup() {
        return {
            Name: ref(''),
            Description: ref(''),
            Permission: ref([]),
            Menus: ref([]),
            Childs: ref([]),
            ticked: ref([]),
            tickStrategy: ref('leaf'),
            AccessMenus: ref([])
        }
    },
    mounted() {
        this.getDetailRoles()
        // this.getPermissions()
        this.getMenus()
    },
    methods: {
        getDetailRoles() {
            let vm = this 

            vm.$api.get('/roles/' + vm.$route.params.id)
                .then(ress => {
                    let item = ress.data.data
                    console.log(item)
                    vm.Name = item.Name
                    vm.Description = item.Description
                    item.Menus.forEach((data) => {
                        vm.AccessMenus.push({ label: data.Name, id: data.ID })
                    })
                    console.log(vm.AccessMenus)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        editRole() {
            let vm = this
            let data = {
                name: vm.Name,
                description: vm.Description,
                menus: vm.AccessMenus
            }
            console.log(vm.Description)
            
            vm.$api.put('/roles/' + vm.$route.params.id, data)
                .then(ress => {
                    if(ress.status == 200) {
                        vm.$q.notify({
                            message: 'Role has been created!',
                            type: 'positive'
                        })
                    } else {
                        vm.$q.notify({
                            message: 'Role cant be created!',
                            type: 'negative'
                        })
                    }
                })
            vm.$router.push({name:'index-role'})
            vm.Name = ''
            vm.Description = ''
            vm.AccessMenus = ''
        },

        // getPermissions() {
        //     let vm = this

        //     vm.$api.get('/permissions')
        //         .then(ress => {
        //             console.log(ress.data.data) 
        //             ress.data.data.forEach((item) => {
        //                 vm.Permission.push({ label: item.Name, children: [item.Name] })
        //             })
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }

        getMenus() {
            let vm = this

            vm.$api.get('/menus')
                .then((ress) => {
                    let data = ress.data.data
                    data.forEach((item) => {
                        vm.Menus.push({ label: item.Name, children: item.Childs.map((x) => {
                            return { label: x.Name }
                            // console.log(x)
                        }) })
                    })
                })
                .catch((err) => console.log(err))
        }
    }
})
</script>
