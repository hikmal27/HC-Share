<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Create Role</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-shadow no-border no-border-radius">
            <q-card-section>
                <form @submit.prevent="createRole" class="tw-full">
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
    name: 'create-role',
    setup() {
        return {
            Name: ref(''),
            Description: ref(''),
            ticked: ref([]),
            tickStrategy: ref('leaf'),
            Permission: ref([]),
            Menus: ref([])
            // tickStrategies: ref([
            //     { value: 'strict', label: 'Strict' }
            // ]),
        }
    },
    mounted() {
        // this.getPermissions()
        this.getMenus()
    },
    methods: {
        createRole() {
            let self = this
            let data = {
                name: self.Name,
                description: self.Description,
                menus: self.ticked
            }
            console.log(data)

            self.$api.post('/roles', data)
                .then(ress => {
                    console.log("Role has been created", ress.data.data)
                    if(ress.status == 200) {
                        self.$q.notify({
                            message: 'Role has been created!',
                            type: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'Role cant be created!',
                            type: 'negative'
                        })
                    }
                    self.$router.push({name: 'index-role'})
                    self.Name = '',
                    self.Description = ''
                })
                .catch((err) => {
                    console.log(err)
                })
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
        //         .catch(err => console.log(err));
        // }

        getMenus() {
            let vm = this

            vm.$api.get('/menus')
                .then((ress) => {
                    let data = ress.data.data
                    data.forEach((item) => {
                        vm.Menus.push({ label: item.Name, id: item.ID, children: item.Childs.map((x) => {
                            return { label: x.Name, id: x.ID }
                        }) })
                    })
                })
                .catch((err) => console.log(err))
        }
    }
})
</script>
