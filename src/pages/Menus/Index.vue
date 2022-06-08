<template>
  <q-page class="tw-p-4">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-2">Menus</h1>
    <hr>
    <q-btn color="orange-10" unelevated class="tw-my-3" :to="{name: 'create-menu'}" text-color="white" label="Create New" />
    <q-hierarchy dense :columns="columns" :data="Childs">
      <template v-slot:body="props" style="box-shadow: none;">
        <td data-th="Name">
			<div v-bind:style="props.setPadding(props.item)"
				:class="props.iconName(props.item)!='done'?'q-pl-lg':''">
				<q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!='done'"
					:icon="props.iconName(props.item)" flat
					dense>
				</q-btn>
				<span class="q-ml-sm">{{props.item.Name}}</span>
			</div>
        </td>
        <td>{{props.item.Url}}</td>
        <td>{{props.item.Icon}}</td>
        <td>{{props.item.Index}}</td>
        <td>
			<router-link :to="{name: 'detail-menu', params:{id: props.item.ID}}"><q-btn icon="edit" color="orange-10" dense flat/></router-link>
			<q-btn icon="delete" color="negative" @click="confirmDelete(props.item.ID)" dense flat />
        </td>
      </template>
    </q-hierarchy>
      <q-dialog v-model="Confirm" persistent>
        <q-card>
			<q-card-section class="row items-center">
				<q-avatar>
					<q-icon name="eva-trash-2-outline" class="tw-text-4xl tw-text-red-600"></q-icon>
				</q-avatar>
				<span class="q-ml-sm">You are sure you want to delete it?</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat label="Cancel" color="black" v-close-popup />
				<q-btn flat label="Delete" color="negative" @click="deleteMenu()" />
			</q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

const columns = [
    { name: 'name', label: 'Name', align: 'left', field: 'Name', sortable: true },
    { name: 'url', label: 'URL', align: 'left', field: 'Url', sortable: true },
    { name: 'icon', label: 'Icon', align: 'left', field: 'Icon', sortable: false },
    { name: 'order', label: 'Order', align: 'left', field: 'Index', sortable: true },
    { name: 'action', label: 'Action', align: 'left', sortable: false },

]
export default defineComponent({
  name: 'menus',

  setup() {
    return {
      Menus: ref([]),
      Confirm: ref(false),
      Id: ref(null),
      Childs: ref([]),
      columns,
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      let self = this
      self.$api.get('/menus')
        .then(ress => {
          let item = ress.data.data
          self.Menus = item
          item.forEach(data => {
            self.Childs.push({ID: data.ID, Name: data.Name, Url: data.Url, Icon: data.Icon ? data.Icon:'-', Index: data.Index != 0 ? data.Index:'-', children: data.Childs.map((y) => { return {
              ID: y.ID, Name: y.Name, Url: data.Url + y.Url, Icon: y.Icon ? y.Icon:'-', Index: y.Index != 0 ? y.Index:'-', children: y.Childs
            }} )})
          })
        })
        .catch(err => console.log(err));
    },

    confirmDelete(id) {
      this.Confirm = true
      this.Id = id
    },

    deleteMenu() {
      let self = this

      self.$api.delete('/menus/' + self.Id)
        .then(ress => {
          console.log("Menu has been deleted!", ress)
          if(ress.status == 200) {
            self.$q.notify({
              message: 'Menu has been deleted!',
              type: 'positive'
            })
          } else {
            self.$q.notify({
              message: 'Menu cant be deleted!',
              type: 'negative'
            })
          }
          self.Confirm = false
        })
        .catch(err => console.log(err))
    },
  },
})
</script>

<style>
    .q-table__card {
        box-shadow: none;
    }
</style>