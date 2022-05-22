<script lang="ts" setup>
import { voteRestaurant } from '~/helpers/voteRestaurant'

defineProps<{
  restaurantId: string
  isVoted: boolean
}>()
</script>

<template>
  <button @click="voteRestaurant(restaurantId)">
    <span v-if="isVoted">Poista ääni</span>
    <span v-else>Äänestä</span>
  </button>
</template>

<style scoped>
button {
  background-color: transparent;
  border: 1px dashed white;
  color: inherit;
}
</style>
