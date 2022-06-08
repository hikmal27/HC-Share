<template>
    <div class="tw-p-4 lg:tw-py-6 tw-border-b ">
        <h1 class="tw-text-2xl tw-font-semibold ">Forms</h1>
    </div>
    <div class="tw-p-4">
        <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
            <form class="tw-full">
                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            First Name
                        </label>
                        <q-input filled v-model="FirstName" type="text" placeholder="Hikmal" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Last Name
                        </label>
                        <q-input filled v-model="LastName" type="text" placeholder="Maulana Ramadhan" />
                    </div>
                </div>
                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                    <div class="tw-w-full tw-px-3 ">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">Password</label>
                        <q-input filled v-model="Password" :type="isPwd ? 'password' : 'text'" placeholder="************" class="tw-w-full">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'" @click="isPwd = !isPwd" />
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-2">
                    <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            City
                        </label>
                        <q-input filled v-model="City" type="text" stack-label class="tw-w-full" placeholder="Jakarta" />
                    </div>
                    <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Category
                        </label>
                        <q-select filled v-model="Category" :options="options" stack-label />
                    </div>
                    <div class="tw-w-full md:tw-w-1/3 tw-px-3 tw-mb-6 md:tw-mb-0">
                        <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                            Zip
                        </label>
                        <q-input filled v-model="Zip" type="text" stack-label class="tw-w-full" placeholder="Placeholder" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Forms',
    setup() {
        return {
            options: [ 'New Mexico', 'Missouri', 'Texas' ],
            FirstName: ref(''),
            LastName: ref(''),
            Password: ref(''),
            City: ref(''),
            Category: ref('Texas'),
            Zip: ref(''),
            isPwd: ref(true)
        }
    },
})
</script>
