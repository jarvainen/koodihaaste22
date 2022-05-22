<script lang="ts" setup>
import { RestaurantVotesDTO } from '~/typings/__generated__/Api'
import VoteButton from '~/components/VoteButton.vue'

const props = defineProps<{
  result: RestaurantVotesDTO
  isVoted: boolean
}>()

const VOTING_CHAR = '#'

const pollGraph = computed(() => VOTING_CHAR.repeat(props.result.votes))
</script>

<template>
  <li :class="{ voted: isVoted }">
    <div>
      <p>{{ result.name }} {{ result.votes }}</p>
      <p>{{ pollGraph }}</p>
    </div>
    <VoteButton :is-voted="isVoted" :restaurant-id="result.restaurantid" />
  </li>
</template>

<style scoped>
p {
  margin: 0;
}

.voted {
  color: indianred;
}

.voted > button {
  border: 1px dashed indianred;
}
</style>
