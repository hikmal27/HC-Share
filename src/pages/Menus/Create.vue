<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Create Menu</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-shadow no-border-radius no-border">
            <q-card-section>
                <form @submit.prevent="createMenu" class="tw-full">
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
                            <q-input color="orange-10" v-model="Order" type="text" label="Order" />
                        </div>
                        <div class="tw-flex-1 tw-px-3">
                            <q-select color="orange-10" v-model="ParentID" :options="Menus" label="Parent ID" stack-label />
                            <!-- <q-input filled v-model="ParentID" type="text" placeholder="Order" /> -->
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-end tw-space-x-2">
                        <q-btn outline color="orange-10" :to="{name: 'index-menu'}" label="Cancel" />
                        <q-btn color="orange-10" unelevated type="submit" text-color="white" label="Submit" />
                    </div>
                </form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'create-menu',
    setup() {
        return {
            Name: ref(''),
            Url: ref(''),
            Icon: ref(''),
            Order: ref(''),
            ParentID: ref(''),
            Menus: ref([]),
        }
    },
    mounted() {
        this.getMenus()
    },
    methods: {
        createMenu() {
            let self = this
            let data = {
                name: self.Name,
                url: self.Url,
                icon: self.Icon,
                order: parseInt(self.Order),
                parent_id: parseInt(self.ParentID.value)
            }
            console.log(data)

            self.$api.post('/menus', data)
                .then(ress => {
                    let item = ress.data.data
                    console.log(item)
                    
                    if(ress.status == 200) {
                        self.$q.notify({
                            message: 'Menu has been created!',
                            color: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'Menu cant be created!',
                            color: 'negative'
                        })
                    }
                    
                    self.Name = ''
                    self.Url = ''
                    self.Icon = ''
                    self.Order = ''
                    self.ParentID = ''
                })
                .catch(err => console.log(err));
            self.$router.push({name: 'index-menu'})
            
            
        },

        getMenus() {
            let vm = this
            this.$emit('menu')
            vm.$api.get('/menus')
                .then((ress) => {
                    let item = ress.data.data
                    item.forEach((data) => {
                        vm.Menus.push({ label: data.Name, value: data.ID })
                    })
                    // console.log(vm.Menus)
                })
                .catch((err) => console.log(err));
        }
    }
}
</script>