<template>
    <q-card flat class="tw-bg-white tw-p-5 tw-mt-10">
        <q-card-section class="q-pa-none tw-flex tw-items-center tw-justify-between tw-pb-5">
            <div class="tw-text-xl">{{ dataTitle }}</div>
            <div class="tw-space-x-2">
                <slot name="top-right" />
            </div>
        </q-card-section>
        <q-card-section class="q-pa-none">
            <q-table
                flat
                bordered
                class="tw-w-full tw-border-gray-100"
                :row-key="dataRowKey"
                v-model:selected="selected"
                selection="multiple"
                :rows="dataRows"
                :columns="dataColumns"
                :loading="dataLoading"
            >
                
                <!-- Header Slot -->
                <template v-slot:header="scope">
                    <q-tr :props="scope">
                        <q-th class="!tw-text-sm tw-text-gray-400 !tw-text-left !tw-bg-gray-50">
                            <q-checkbox size="30px" v-model="scope.selected" color="grey-10"/>
                        </q-th>
                        <q-th
                            v-for="col in scope.cols"
                            :key="col.name"
                            :props="scope"
                            class="!tw-text-sm tw-text-gray-400 !tw-bg-gray-50"
                        >
                            {{ col.label }}
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="scope">
                    <q-tr :props="scope">
                        <q-td>
                            <q-checkbox size="30px" v-model="scope.selected" color="grey-10"/>
                        </q-td>
                        <q-td
                            v-for="col in scope.cols"
                            :key="col.name"
                        >
                            <slot :name="col.name" v-bind="scope">
                                {{ scope.row[col.field] }}
                            </slot>
                        </q-td>
                    </q-tr>
                </template>

                <!-- Loading Slot -->
                <template v-slot:loading>
                    <q-inner-loading showing color="warning" />
                </template>
            </q-table>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'SideMenu',
    setup() {
        return {
            selected: ref([])
        }
    },
    props: {
        dataTitle: {
            type: String
        },
        dataColumns: {
            type: Array,
            default: []
        },
        dataRows: {
            type: Array,
            default: []
        },
        dataLoading: {
            type: Boolean,
            default: true
        },
        selected: {
            type: Array,
            default: []
        },
        dataRowKey: {
            type: String,
            default: "ID"
        }
    }
})
</script>