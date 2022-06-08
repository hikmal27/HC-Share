<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Edit User</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-border no-border-radius">
        <q-card-section>
            <form @submit.prevent="editUser" class="tw-full">
                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <q-input color="orange-10" v-model="Name" label="Name" type="text" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                        <q-input color="orange-10" v-model="Username" type="text" label="Username" />
                    </div>
                </div>

                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <q-input color="orange-10" v-model="Email" type="email" label="Email" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <q-input color="orange-10" v-model="Password" :type="isPwd ? 'password' : 'text'" label="Password" class="tw-w-full">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'" @click="isPwd = !isPwd" />
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="tw-flex tw-justify-end tw-space-x-2">
                    <q-btn outline color="orange-10" :to="{name: 'index-user'}" label="Cancel" />
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
    name: 'detail-user',
    setup() {
        return {
            Name: ref(''),
            Username: ref(''),
            Email: ref(''),
            Password: ref(''),
            Role: ref([]),
            isPwd: ref(true),
            RoleOpt: ref([])
        }
    },
    mounted() {
        this.getDetailUser()
        // this.getRoles()
    },
    methods: {
        getDetailUser() {
            let self = this

            self.$api.get('/users/' + self.$route.params.id)
                .then((ress) => {
                    console.log(ress.data.data)
                    let item = ress.data.data
                    self.Name = item.Name
                    self.Username = item.Username
                    self.Email = item.Email
                    item.Roles.forEach(data => {
                        self.Role.push({label: data.Name, value: data.ID})
                    })
                    // item.Role.forEach((data) => {
                    //     self.Role.push({label: data.Name, value: data.ID})
                    // })
                    // console.log(self.Role)
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        // getRoles() {
        //     let self = this
        //     self.$api.get('/roles')
        //         .then((ress) => {
        //             ress.data.data.forEach((item) => {
        //                 self.RoleOpt.push({label: item.Name, value: item.ID})
        //             })
        //             // console.log(self.RoleOpt)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // },

        editUser() {
            let self = this

            let role = self.Role.map(x => x.value)

            let data = {
                username: self.Username,
                name: self.Name,
                email: self.Email,
                password: self.Password,
                role_id: role
            }

            console.log(data)

            
            
            self.$api.put('/users/' + self.$route.params.id, data)
                .then((ress) => {
                    // console.log(ress.status)
                    if (ress.status == 200) {
                        self.$q.notify({
                            message: 'User has been updated!',
                            color: 'positive'
                        })
                    } else {
                        self.$q.notify({
                            message: 'User cant be updated!',
                            color: 'negative'
                        })
                    }
                    self.$router.push({name: 'index-user'})
                    self.Name = ''
                    self.Username = ''
                    self.Email = ''
                    self.Password = ''
                    self.Role = ''
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }
})
</script>
