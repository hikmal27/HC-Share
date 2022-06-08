<template>
	<q-list class="tw-space-y-5 tw-px-5" v-if="Childs.length == 0">
		<q-item
			clickable
			v-ripple
			class="
				tw-flex
				tw-items-center
				tw-px-4
				tw-transition-colors
				tw-rounded
				tw-text-gray-400
				dark:tw-text-light
				dark:hover:bg-primary
			"
			:to="Url" 
			@click="dataLink(Name)"
			:active="menuActive === Name" active-class="tw-text-gray-900 tw-bg-gray-50 tw-font-semibold"
		>
			<q-item-section avatar>
				<q-icon color="gray-8" :name="Icon"/>
			</q-item-section>
			<q-item-section class="tw-text-sm">
				{{ Name }}
			</q-item-section>
		</q-item>

	</q-list>
	<q-list v-else class="tw-space-y-2 tw-px-5">
		<q-expansion-item
			group="expand"
			:label="Name"
			:icon="Icon"
			@click="handleClick"
			class="tw-text-gray-400 tw-transition-colors tw-rounded"
			:active="menuActive === Childs.Name"
			active-class="tw-bg-indigo-50">
			<div v-for="level_1 in Childs" :key="level_1.Url">
				<div v-if="level_1.Childs.length != 0">
					<q-expansion-item
						switch-toggle-side
						class="tw-ml-2 q-parent-child"
						:label="level_1.Name"
					>
						<div v-for="level_2 in level_1.Childs" :key="level_2.Url" class="tw-ml-5">
							<div v-if="level_2.Childs.length != 0">
								<q-expansion-item
									switch-toggle-side
									class="tw-ml-2"
									:label="level_2.Name"
								>
									<div v-for="level_3 in level_2.Childs" :key="level_3.Url" class="tw-ml-5">
										<ul class="tw-text-sm">
											<li @click="dataLink(level_3.Name)" class="tw-px-2 tw-py-2 tw-flex tw-items-center tw-gap-5">
												<q-icon name="eva-radio-button-off-outline" size=".7em" class="tw-ml-5" />
												<router-link :to="Url + level_1.Url + level_2.Url + level_3.Url">{{ level_3.Name }}</router-link>
											</li>
										</ul>
									</div>
								</q-expansion-item>
							</div>

							<div v-else>
								<ul class="tw-text-sm">
									<li @click="dataLink(level_2.Name)" class="tw-px-2 tw-py-2 tw-flex tw-items-center tw-gap-5">
										<q-icon name="eva-radio-button-off-outline" size=".7em" class="tw-ml-5" />
										<router-link :to="Url + level_1.Url + level_2.Url">{{ level_2.Name }}</router-link>
									</li>
								</ul>
							</div>
						</div>
					</q-expansion-item>
				</div>
				<div v-else>
					<ul class="tw-text-sm">
						<li @click="dataLink(level_1.Name)" class="tw-px-2 tw-py-3 tw-flex tw-items-center tw-gap-5">
							<q-icon name="eva-radio-button-off-outline" size=".7em" class="tw-ml-5" />
							<router-link :to="Url + level_1.Url">{{ level_1.Name }}</router-link>
						</li>
					</ul>
				</div>
			</div>
		</q-expansion-item>
	</q-list>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'SideMenu',
	setup() {
		return {
			menuActive: ref(null)
		};
	},
	props: {
		Name: {
			type: String,
			required: true
		},
		Icon: {
			type: String,
			default: ''
		},
		Url: {
			type: String,
			default: '#'
		},
		Childs: {
			type: Array,
			default: [] 
		}
	},
	methods: {
		handleClick() {
			this.$emit('click')
		},
		dataLink(data) {
			this.menuActive = data
		}
	}
})
</script>

<style>
.q-item__section--avatar {
	min-width: 0px;
}

.q-item__section--side > .q-expansion-item__toggle-icon {
	font-size: 18px;
}

.q-parent-child .q-expansion-item__container .q-hoverable:hover .q-focus-helper {
	background: inherit;
	opacity: 0;
}
</style>