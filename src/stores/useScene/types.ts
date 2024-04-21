export type Scene = {
  id: number
  title: string
  instructions: string
  duration: number
  rndBtnOptions?: string[]
  type: string
  selected?: boolean
}

export interface SelectScenesObject {
  numberOfScenes: number
  shuffle: boolean
}
