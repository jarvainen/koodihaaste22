import { useAlreadyVoted } from '~/composables/useAlreadyVoted'
import { fetchWithCookie } from '~/helpers/fetchWithCookie'
import { RestaurantResponseDTO } from '~/typings/__generated__/Api'

export async function initAlreadyVoted (): Promise<void> {
  const { public: { cookieName, initialCity } } = useRuntimeConfig()
  const { data: initialRestaurantData } = await useAsyncData('restaurants', () => fetchWithCookie(`/api/restaurants?city=${initialCity}`, cookieName))
  const alreadyVoted = useAlreadyVoted()
  const { alreadyVoted: votedData = null } = unref<RestaurantResponseDTO>(initialRestaurantData)
  alreadyVoted.value = votedData
}
