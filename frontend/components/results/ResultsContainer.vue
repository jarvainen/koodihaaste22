<script lang="ts" setup>
import { VotingResultDTO } from '~/typings/__generated__/Api'

import ResultsListItem from '~/components/results/ResultsListItem.vue'
import { useAlreadyVoted } from '~/composables/useAlreadyVoted'

const { $ws: websocket } = useNuxtApp()

onMounted(() => {
  websocket.addEventListener('open', async () => {
    await refreshResults()
  })

  websocket.addEventListener('message', async () => {
    await refreshResults()
  })
})

const { data: resultsData, refresh: refreshResults } = await useFetch('/api/results')

const alreadyVoted = useAlreadyVoted()

const results = computed(() => {
  const { results } = unref<VotingResultDTO>(resultsData)
  return results
})
</script>

<template>
  <aside id="tulokset">
    <h3>Äänestystulokset</h3>
    <transition-group name="results" tag="ul">
      <ResultsListItem
        v-for="result in results"
        :key="result.restaurantid"
        :result="result"
        :is-voted="result.restaurantid === alreadyVoted"
      />
    </transition-group>
  </aside>
</template>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  margin: 0.5em;
}

.results-move,
.results-enter-active,
.results-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.results-enter-from,
.results-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.results-leave-active {
  position: absolute;
}
</style>
