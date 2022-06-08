<template>
    <q-page class="tw-p-4">
        <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Create User</h1>
        <hr>
        <q-card flat bordered class="my-card tw-my-3 no-border no-border-radius">
            <q-card-section>
                <q-form @submit.prevent.stop="create" class="tw-full">
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <q-input color="orange-10" ref="inputRef" v-model="Name" label="Name" type="text"
                            :rules="[val => !!val || 'Field is required']" />
                        </div>
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                            <q-input color="orange-10" ref="inputRef" v-model="Username" type="text" label="Username"
                            :rules="[val => !!val || 'Field is required']" />
                        </div>
                    </div>

                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <q-input color="orange-10" ref="inputRef" v-model="Email" type="email" label="Email"
                            :rules="[val => !!val || 'Field is required']" />
                        </div>
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <q-input color="orange-10" v-model="Password" ref="inputRef" :type="isPwd ? 'password' : 'text'" label="Password" class="tw-w-full"
                            :rules="[val => !!val || 'Field is required']">
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
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "user-create",
  setup() {
    return {
        inputRef: ref(null),
        Name: ref(''),
        Username: ref(''),
        Email: ref(''),
        Password: ref(''),
        Role: ref(),
        isPwd: ref(true),
        // RoleOpt: ref([])
    };
  },
  mounted() {
    //   this.getRoles()
  },
  methods: {
      create() {
          let self = this
          let data = {
              username: self.Username,
              name: self.Name,
              email: self.Email,
              password: self.Password,
            //   role_id: "test"
          }
        //   console.log(data)

          self.$api.post('auth/register', data)
            .then(ress => {
                // console.log(ress)
                if(ress.status == 200) {
                    self.$q.notify({
                        message: 'User has been created!.',
                        color: 'positive'
                     })
                } else {
                    self.$q.notify({
                        message: 'User cant be created!.',
                        color: 'negative'
                     })
                }
                self.$router.push({name: 'index-user'})
                self.Name = ''
                self.Username = ''
                self.Email = ''
                self.Password = ''
                // self.Role = null
            })
            .catch(err => {
                console.log(err.response)
                self.$q.notify({
                    message: err,
                    color: 'negative'
                })
            })
      },

      getRoles() {
          let self = this
          self.$api.get('/roles')
            .then((ress) => {
                ress.data.data.forEach((item) => {
                    self.RoleOpt.push({label: item.Name, value: item.ID})
                })
                console.log(self.RoleOpt)
            })
            .catch((err) => {
                console.log(err)
            })
      }
  }
});
</script>
