<script lang="ts" setup>
import { RestaurantDTO } from '~/typings/__generated__/Api'
import VoteButton from '~/components/VoteButton.vue'

defineProps<{
  restaurant: RestaurantDTO
  isVoted: boolean
}>()
</script>

<template>
  <li :class="{ voted: isVoted }">
    <p>{{ restaurant.name }}</p>
    <VoteButton :is-voted="isVoted" :restaurant-id="restaurant.id" />
  </li>
</template>

<style scoped>
h4 {
  display: inline-block;
  margin-right: 2em;
}

li {
  border-top: 1px dashed white;
  color: white;
  display: flex;
  justify-content: space-between;
}

.voted {
  border-top: 1px dashed indianred;
  color: indianred;
}

.voted > button {
  border: 1px dashed indianred;
}
</style>
