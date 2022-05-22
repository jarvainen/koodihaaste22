<script lang="ts" setup>
import { RestaurantResponseDTO } from '~/typings/__generated__/Api'
import { fetchWithCookie } from '~/helpers/fetchWithCookie'

const NO_LUNCH = 'ei lounasta'

const { public: { cookieName, initialCity } } = useRuntimeConfig()

const city = ref(initialCity)
const alreadyVoted = useAlreadyVoted()

watch(city, (_value, _oldValue, onCleanUp) => {
  const debounce = setTimeout(() => refresh(), 200)
  onCleanUp(() => clearTimeout(debounce))
})

const { data: restaurantsData, refresh } = await useAsyncData('restaurants', () => fetchWithCookie(`/api/restaurants?city=${city.value}`, cookieName))

const restaurants = computed(() => {
  const { restaurants, alreadyVoted: votedData = null } = unref<RestaurantResponseDTO>(restaurantsData)
  alreadyVoted.value = votedData
  return restaurants?.filter(restaurant => restaurant.openingHours !== NO_LUNCH) ?? []
})
</script>

<template>
  <section>
    <h2>Ravintolat</h2>
    <ul>
      <RestaurantsListItem
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
        :is-voted="restaurant.id === alreadyVoted"
      />
    </ul>
    <label>hae >
      <input v-model="city" type="text">
    </label>
  </section>
</template>

<style scoped>
input {
  background-color: transparent;
  color: white;
  border: 1px dashed white;
}
</style>
