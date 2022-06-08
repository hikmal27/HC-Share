<template>
    <q-dialog v-model="open">
        <q-card class="tw-p-2" style="width:400px">
            <q-card-section>
                <div class="tw-text-2xl font-reem-kufi tw-font-medium tw-mb-2">{{ title }}</div>
                <span class="tw-text-gray-400 font-manrope">{{ message }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <slot />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'SideMenu',
    setup() {
        return {

        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "Alert"
        },
        message: {
            type: String,
            default: ""
        }
    },
    methods: {
        onOk() {
            this.$emit('ok')
        }
    }
})
</script>