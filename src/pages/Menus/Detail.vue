<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Create Menu</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-border no-shadow no-border-radius">
            <q-card-section>
                <form @submit.prevent="editMenu" class="tw-full">
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <q-input color="orange-10" v-model="Name" type="text" label="Name" />
                        </div>
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                            <q-input color="orange-10" v-model="Url" type="text" label="Url" />
                        </div>
                        
                    </div>
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-flex-1 tw-px-3">
                            <q-input color="orange-10" v-model="Icon" type="text" label="Icon" />
                        </div>
                        <div class="tw-px-3">
                            <q-input color="orange-10" v-model="Index" type="text" label="Index" />
                        </div>
                        <div v-if="ParentID" class="tw-flex-1 tw-px-3">
                            <q-select color="orange-10" v-model="ParentID" :options="Menus" map-options label="Parent ID" stack-label />
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-end tw-space-x-2">
                        <q-btn outline color="orange-10" :to="{name: 'index-menu'}" label="Cancel" />
                        <q-btn color="orange-10" type="submit" unelevated text-color="white" label="Submit" />
                    </div>
                </form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'detail-menu',
    setup() {
        return {
            Name: ref(''),
            Url: ref(''),
            Icon: ref(''),
            Index: ref(''),
            ParentID: ref(''),
            Menus: ref([])
        }
    },
    mounted() {
        this.getDetailMenu()
        this.getMenus()
    },
    methods: {
        editMenu() {
            let vm = this
            let data = {
                name: vm.Name,
                url: vm.Url,
                icon: vm.Icon,
                Index: parseInt(vm.Index),
                parent_id: parseInt(vm.ParentID.value)
            }

            console.log(data)

            vm.$api.put('/menus/' + vm.$route.params.id, data)
                .then(ress => {
                    if(ress.status == 200) {
                        vm.$q.notify({
                            message: 'Menu has been Updated!',
                            color: 'positive'
                        })
                    } else {
                        vm.$q.notify({
                            message: 'Menu cant be updated!',
                            color: 'negative'
                        })
                    }
                    
                })
                .catch((err) => console.log(err))
            
            this.$emit('menu')

            vm.Name = ''
            vm.Url = ''
            vm.Icon = ''
            vm.Index = ''
            vm.ParentID = ''
            vm.$router.push({name: 'index-menu'})
        },

        getDetailMenu() {
            let vm = this

            vm.$api.get('/menus/' + vm.$route.params.id)
                .then(ress => {
                    console.log(ress.data.data)
                    vm.Name = ress.data.data.Name
                    vm.Url = ress.data.data.Url
                    vm.Icon = ress.data.data.Icon
                    vm.Index = ress.data.data.Index
                    vm.ParentID = ress.data.data.ParentID
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getMenus() {
            let vm = this

            vm.$api.get('/menus')
                .then((ress) => {
                    let item = ress.data.data
                    item.forEach((data) => {
                        vm.Menus.push({ label: data.Name, value: data.ID })
                    })
                    console.log(item)
                })
                .catch((err) => console.log(err))
        }
    }
})
</script>
