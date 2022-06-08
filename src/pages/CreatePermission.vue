<template>
    <q-page>
        <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
            <h1 class="tw-text-2xl tw-font-semibold">Create Permission</h1>
        </div>

        <div class="tw-p-4">
            <div class="tw-w-full tw-p-4 tw-bg-white tw-rounded-sm">
                <form @submit.prevent="editPermission" class="tw-full">
                    <div class="tw-flex tw-flex-wrap tw--mx-3 tw-mb-6">
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3 tw-mb-6 md:tw-mb-0">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Name
                            </label>
                            <q-input filled v-model="Name" type="text" placeholder="Name" />
                        </div>
                        <div class="tw-w-full md:tw-w-1/2 tw-px-3">
                            <label class="tw-block tw-uppercase tw-tracking-wide tw-text-gray-700 tw-text-xs tw-font-bold tw-mb-2">
                                Description
                            </label>
                            <q-input filled v-model="Description" type="text" placeholder="Description" />
                        </div>
                    </div>
                    <!-- Submit -->
                    <div class="tw-flex tw-justify-center tw-space-x-2">
                        <button class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-orange-600 tw-text-white tw-text-sm tw-rounded-sm">Submit</button>
                        <router-link to="/setting/permission" class="tw-w-1/4 tw-px-4 tw-py-3 tw-bg-green-600 tw-text-white tw-text-sm tw-rounded-sm tw-text-center">Cancel</router-link>
                    </div>
                </form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'create-permission',
    setup() {
        return {
            Name: ref(''),
            Description: ref(''),
        }
    },
    methods: {
        editPermission() {
            let vm = this
            let data = {
                name: vm.Name,
                description: vm.Description
            }

            vm.$api.post('/permissions', data)
                .then(ress => {
                    console.log(ress)
                    if(ress.status == 200) {
                        vm.$q.notify({
                            message: 'Permission has been created!',
                            color: 'positive'
                        })
                    } else {
                        vm.$q.notify({
                            message: 'Permission cant be created!',
                            color: 'negative'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

            vm.Name = ''
            vm.Description = ''
        }
    }
})
</script>
