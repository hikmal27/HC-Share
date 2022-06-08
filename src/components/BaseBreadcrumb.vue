<template>
    <div class="tw-flex tw-items-center tw-justify-between">
        <h1 class="tw-text-4xl  tw-font-medium tw-mb-2">{{ title }}</h1>
        <q-breadcrumbs class="font-manrope tw-text-sm tw-text-gray-400">
            <q-breadcrumbs-el v-for="crumb in crumbs" :label="crumb" />
        </q-breadcrumbs>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        return {

        }
    },
    props: {
        title: {
            type: String
        },
        crumbs: {
            type: Array
        }
    }
})
</script>