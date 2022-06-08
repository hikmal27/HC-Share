<template>
    <!-- <div
        class="
        tw-flex
        tw-flex-col
        tw-items-center
        tw-justify-center
        tw-min-h-screen
        tw-p-4
        tw-space-y-4
        tw-antialiased
        tw-text-gray-900
        tw-bg-gray-100
        dark:tw-bg-dark dark:tw-text-light
        tw-font-['Poppins']
        "
    >

        <div
            class="
            tw-w-full tw-max-w-sm tw-px-4

            tw-py-4
            tw-space-y-6 tw-bg-white tw-rounded-md
            dark:tw-bg-darker
            "
        >
            <h1 class="tw-text-xl tw-font-semibold tw-text-center">Login</h1>
            <form @submit.prevent="login">
            <q-input
                outlined
                label="Username"
                type="text"
                v-model="username"
            >
                <template v-slot:prepend>
                <q-icon name="eva-people-outline" />
                </template>
            </q-input>
            <q-input
                outlined
                class="tw-mt-5"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                v-model="password"
            >
                <template v-slot:prepend>
                    <q-icon :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'" @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <div>
                <q-btn label="Submit" type="submit" class="tw-w-full tw-px-4 tw-py-2 tw-font-medium tw-text-center tw-text-white tw-transition-colors tw-duration-200 tw-rounded-md tw-bg-teal-700 hover:tw-bg-teal-800 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-offset-1 dark:focus:tw-ring-offset-darker tw-mt-3"/>
            </div>
            </form>
            <div class="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">
            Don't have an account yet? <router-link to="/" class="tw-text-blue-600 hover:tw-underline">Register</router-link>
            </div>
        </div>
    </div> -->
    <div class="tw-flex tw-w-full tw-justify-between" style="font-family: 'Reem Kufi', sans-serif">
        
        <div class="tw-w-5/12 tw-px-20 tw-mt-10">
            <img src="logo.png" class="tw-w-32">
            <div class="tw-text-4xl tw-font-medium">Hi, Welcome Back!</div>
            
            <!-- Forms -->
            <form @submit.prevent="login" class="tw-w-full tw-mt-10 tw-space-y-5">
                
                <div class="tw-block">
                    <label class="tw-tracking-wide tw-text-gray-700 tw-text-sm tw-font-medium">Username</label>
                    <q-input outlined v-model="username" ref="refUsername" placeholder="username@smartfinance.co.id" color="warning" class="tw-mt-2"/>
                </div>

                <div class="tw-block">
                    <label class="tw-tracking-wide tw-text-gray-700 tw-text-sm tw-font-medium">Password</label>
                    <q-input outlined v-model="password" ref="refPassword" :type="isPwd ? 'password' : 'text'" placeholder="x x x x x x" color="warning" class="tw-mt-2">
                        <template v-slot:append>
                            <q-icon
                                size="xs"
                                :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>
                </div>

                <div class="tw-flex tw-justify-end">
                    <span class="tw-text-gray-400">Forgot Password?</span>
                </div>
                
                <q-btn no-caps unelevated type="submit" color="warning" label="Sign In" class="tw-w-full tw-py-3" />
            </form>
        </div>

        <div class="tw-w-7/12">
            <img src="~/assets/highlight-1.png" class="tw-w-full tw-h-screen">
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "login",
    setup() {
        return {
            username: ref(''),
            password: ref(''),
            isPwd: ref(true)
        }
    },
    methods: {
        login() {

        let self = this
        let data = {
            username: self.username,
            password: self.password
        }

        self.$api.post('/auth/login', data).then((ress) => {
                sessionStorage.setItem('access_token', ress.data.data)
                self.$router.push({ name: 'Home' })
            })
            .catch((err) => {
                console.log(err.response)
            })

        }
    }
}
</script>
