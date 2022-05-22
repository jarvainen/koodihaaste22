import { useAlreadyVoted } from '~/composables/useAlreadyVoted'

export async function voteRestaurant (restaurantId: string) : Promise<void> {
  const { $ws: websocket } = useNuxtApp()
  const alreadyVoted = useAlreadyVoted()

  await useFetch(`/api/vote?id=${restaurantId}`, { method: 'POST', credentials: 'include', initialCache: false })
  if (alreadyVoted.value === restaurantId) {
    alreadyVoted.value = null
  } else {
    alreadyVoted.value = restaurantId
  }
  websocket.send('update')
}
