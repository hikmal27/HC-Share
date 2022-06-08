<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-4 tw-border-b lg:tw-py-6 dark:tw-border-primary-darker">
    <h1 class="tw-text-2xl tw-font-semibold ">Dahsboard</h1>
    <!-- <router-link
      to="/"
      class="
        tw-px-4 tw-py-2 tw-text-sm tw-text-white tw-rounded-md tw-bg-cyan-600
        hover:tw-bg-cyan-700
        focus:tw-outline-none
        focus:tw-ring
        focus:tw-ring-primary
        focus:tw-ring-offset-1
        focus:tw-ring-offset-white
        dark:focus:tw-ring-offset-dark
      "
      >
        <q-icon name="eva-github-outline" />
        <span class="tw-ml-1">View on Github</span>
      </router-link> -->
  </div>

  <div class="tw-mt-2">
    <div
      class="
        tw-grid tw-grid-cols-1 tw-gap-8 tw-p-4
        lg:tw-grid-cols-2
        xl:tw-grid-cols-4
      "
    >
      <div
        v-for="data in datas"
        :key="data.title"
        class="
          tw-flex
          tw-items-center
          tw-justify-between
          tw-p-4
          tw-bg-white
          tw-rounded-md
          dark:tw-bg-darker
        "
      >
        <div>
          <h6
            class="
              tw-text-xs
              tw-font-medium
              tw-leading-none
              tw-tracking-wider
              tw-text-gray-500
              tw-uppercase
              dark:tw-text-primary-light
            "
          >
            {{ data.title }}
          </h6>
          <span class="tw-text-xl tw-font-semibold">{{ data.value }}</span>
          <span
            class="
              tw-inline-block
              tw-px-2
              tw-py-px
              tw-ml-2
              tw-text-xs
              tw-text-green-500
              tw-bg-green-100
              tw-rounded-md
            "
          >
            {{ data.percentage }}
          </span>
        </div>
        <div>
          <q-icon :name="data.icon" class="tw-text-4xl tw-text-cyan-700" />
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="tw-p-4">
    <div class="tw-w-full tw-bg-white tw-rounded-sm">
      <header class="tw-px-5 tw-py-4 tw-border-b tw-border-gray-100">
          <h2 class="tw-font-semibold tw-text-gray-800">Charts</h2>
      </header>
      <div class="tw-w-full tw-flex tw-justify-between tw-px-3 tw-py-3">
        <div class="tw-flex-1">
          <apexchart type="line" height="300" :options="options" :series="series"></apexchart>
        </div>
        <div class="tw-flex-1">
          <apexchart type="radar" height="350" :options="radarOptions" :series="radarSeries"></apexchart>
        </div>
      </div>
    </div>
  </div> -->

  <div class="tw-p-4">
      <div class="tw-w-full tw-mx-auto tw-bg-white tw-rounded-sm">
            <header class="tw-px-5 tw-py-4 tw-border-b tw-border-gray-100">
                <h2 class="tw-font-semibold tw-text-gray-800">Customers</h2>
            </header>
            <div class="tw-p-3">
                <div class="tw-overflow-x-auto">
                    <table class="tw-table-auto tw-w-full">
                        <thead class="tw-text-xs tw-font-semibold tw-uppercase tw-text-gray-400 tw-bg-gray-50">
                            <tr>
                                <th class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-font-semibold tw-text-left">Name</div>
                                </th>
                                <th class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-font-semibold tw-text-left">Email</div>
                                </th>
                                <th class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-font-semibold tw-text-left">Spent</div>
                                </th>
                                <th class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-font-semibold tw-text-center">Country</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tw-text-sm tw-divide-y tw-divide-gray-100">
                            <tr v-for="(customer, index) in customers" :key="index">
                                <td class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-flex tw-items-center">
                                        <div class="tw-font-medium tw-text-gray-800">{{ customer.name }}</div>
                                    </div>
                                </td>
                                <td class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-text-left">{{ customer.email }}</div>
                                </td>
                                <td class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-text-left tw-font-medium tw-text-green-500">{{ customer.spent }}</div>
                                </td>
                                <td class="tw-p-2 tw-whitespace-nowrap">
                                    <div class="tw-text-lg tw-text-center">{{ customer.country }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import VueApexCharts from "vue3-apexcharts";

const datas = [
  {
    title: "Value",
    value: "$30.000",
    percentage: "+4.4%",
    icon: "eva-behance-outline",
  },
  {
    title: "Users",
    value: "$50,021",
    percentage: "+2.6%",
    icon: "eva-people-outline",
  },
  {
    title: "Orders",
    value: "$45,021",
    percentage: "+3.1%",
    icon: "eva-trending-up-outline",
  },
  {
    title: "Tickets",
    value: "$20,516",
    percentage: "+3.1%",
    icon: "eva-shopping-cart-outline",
  },
];

export default defineComponent({
  name: "home",
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      datas,
      customers: [],
      search: "",
      // chart
      series: [
        {
          name: 'Website Blog',
          type: 'column',
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        {
          name: 'Social Media',
          type: 'line',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: [0, 4],
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
        xaxis: {
          type: 'datetime',
        },
        yaxis: [
          {
            title: {
              text: 'Website Blog'
            }
          },
          {
            opposite: true,
            title: {
              text: 'Social Media'
            }
          }
        ],
      },

      // radar chart
      radarSeries: [
        {
          name: 'radar-1',
          data: [70, 50, 30, 30, 100, 70],
        }
      ],

      radarOptions: {
        chart: {
          height: 350,
          type: 'radar',
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June'],
        }
      }

    };
  },
  mounted() {
    this.getCustomers()
    // this.getMenus()
  },
  methods: {
    getCustomers: function() {
      this.$api.get("https://61c0415033f24c0017823211.mockapi.io/api/v1/customers")
        .then(response => {
          let data = response.data
          this.customers = data
        })
        .catch(error => {
          console.log(error)
        })
    },

    getMenus() {
      let vm = this

      vm.$api.get('/menus')
        .then((ress) => {
          console.log(ress.data.data)
        })
        .catch((err) => console.log(err));
    }
  }
});
</script>
