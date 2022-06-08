<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
    <h1 class="tw-text-2xl tw-font-semibold ">Pages</h1>
  </div>
  <div class="q-pa-md" style="max-width: 400px">
      <!-- <q-field filled label="Pick a date" stack-label class="tw-mb-3">
        <q-date class="q-mt-sm full-width" first-day-of-week="1" v-model="formFood.date" />
      </q-field> -->
      
      <q-select standout="bg-teal text-white" v-model="formFood.category" :options="options" label="Custom standout" stack-label />
      <q-input
        filled
        class="q-mt-sm"
        v-model="formFood.name"
        label="Food name"
        lazy-rules
        stack-label
      />

      <q-input
        filled
        class="q-mt-sm"
        type="number"
        v-model="formFood.price"
        label="Price"
        lazy-rules
        stack-label
      />
      <q-input
        filled
        class="q-mt-sm"
        type="number"
        v-model="formFood.qty"
        label="Qty"
        lazy-rules
        stack-label
      />

      <div>
        <q-btn label="Submit" class="q-mt-sm" type="submit" color="primary" v-show="!updateSubmit" @click="handleSubmit" />
      </div>
        <q-btn label="Update" class="q-mt-sm tw-bg-green-600 tw-text-white" type="submit" v-show="updateSubmit" @click="handleUpdate" />
        <q-btn label="Cancel" type="reset" flat class="q-mt-sm q-ml-sm tw-bg-yellow-500 tw-text-white" v-show="updateSubmit" @click="onReset" />
  </div>

  <div class="q-pa-md">
    <q-list class="rounded-borders tw-mt-2">
      <q-expansion-item label="Filtering Table" icon="eva-search-outline" class="tw-bg-white">
        <q-card class="tw-flex tw-flex-col tw-justify-center tw-p-4">
          <div class="tw-flex tw-mt-3">
            <div class=" tw-w-1/4">
              <q-select filled v-model="search" :options="options" label="Select Category" stack-label />
            </div>
            <div class=" tw-w-1/4 tw-ml-10">
              <q-input filled v-model="formFood.name" label="Enter Name" stack-label />
            </div>
            <div class=" tw-w-1/4 tw-ml-10">
              <q-input filled type="date" v-model="formFood.date" />
            </div>
          </div>
          <div class="tw-mt-3">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" flat class="q-mt-sm q-ml-sm tw-mt-0 tw-bg-yellow-500 tw-text-white" @click="resetFiltered" />
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>

  <div class="q-pa-md">
    <q-table title="Foods" class="tw-mt-0" :rows="filteredFoods" :columns="columns" >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn @click="editData(props.row)">Edit</q-btn>
          <q-btn class="q-ml-sm" @click="deleteData(props.row.id)">Delete</q-btn>
        </q-td>
      </template>
    </q-table>

    
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from 'axios';


const columns = [
  {
    name: "id",
    align: "center",
    label: "Id",
    field: (row) => row.id || '-',
  },
  {
    name: "category",
    label: "Category",
    field: (row) => row.category,
  },
  {
    name: "name",
    align: "center",
    label: "Name",
    field: (row) => row.name,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: (row) => row.price,
  },
  {
    name: "qty",
    align: "center",
    label: "Qty",
    field: (row) => row.qty,
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: (row) => row.action
  }
  
];

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      columns,
      foods: [],
      formFood: {
          category: "",
          name: "",
          price: null,
          qty: null,
          date: ref('2021/12/27')
      },
      options: [
        'Makanan', 'Minuman'
      ],
      updateSubmit: false,
      idFoods: null,
      search: "",
      
    };
  },
  mounted() {
      this.getFoods()
  },
  methods: {
    getFoods() {
        axios.get("https://61c0415033f24c0017823211.mockapi.io/api/v1/foods")
            .then(response => {
                this.foods = response.data
                // console.log(this.foods)
            })
            .catch(error => {
                console.log(error)
            })
    },
    handleSubmit() {
      axios.post("https://61c0415033f24c0017823211.mockapi.io/api/v1/foods", this.formFood)
        .then(response => {
          this.getFoods()
          console.log(response)
          this.formFood = {
            category: "",
            name: "",
            price: null,
            qty: null,
            date: ref('')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    editData(props) {
      this.formFood.id = props.id
      this.formFood.category = props.category
      this.formFood.name = props.name
      this.formFood.price = props.price
      this.formFood.qty = props.qty
      this.updateSubmit = true
      // console.log(props)
    },
    handleUpdate() {
      // console.log(this.formFood)
      axios.put("https://61c0415033f24c0017823211.mockapi.io/api/v1/foods/" + this.formFood.id, this.formFood)
        .then(response => {
          this.getFoods()
          this.formFood = {
            category: "",
            name: "",
            price: null,
            qty: null
          }
          this.updateSubmit = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteData(id) {
      // console.log(id)
      axios.delete("https://61c0415033f24c0017823211.mockapi.io/api/v1/foods/" + id)
        .then(response => {
          console.log(response)
          this.getFoods()
        })
        .catch(error => {
          console.log(error)
        })
    },
    onReset() {
      this.formFood = {
          category: "",
          name: "",
          price: null,
          qty: null
      }
      this.updateSubmit = false
    },
    resetFiltered() {
      this.search = ""
    }
  },
  computed: {
    filteredFoods: function() {
        return this.foods.filter((food) => {
          return food.category.match(this.search)
        })
    }
  }
});
</script>
