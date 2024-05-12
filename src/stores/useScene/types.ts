export type Scene = {
  id: number
  title: string
  instructions: string
  duration: number
  detail?: string
  rndBtnOptions?: string[]
  type: string
  selected?: boolean
}

export interface SelectScenesObject {
  numberOfScenes: number
  shuffle: boolean
}
