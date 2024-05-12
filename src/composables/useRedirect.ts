import { ViewName } from '@/router/types'
import { useRouter } from 'vue-router'

export default function useRedirect() {
  // ROUTER
  const router = useRouter()

  function goHome() {
    router.push({ name: ViewName.HOME })
  }

  return {
    goHome
  }
}
