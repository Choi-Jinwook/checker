export interface InfoData {
  uid: string | undefined
  creatorName: string | null | undefined
  storeName: string
  storeInfo: string
  lat: string | string[] | undefined
  lng: string | string[] | undefined
  addr: string
  hide: boolean
  likes: number
  likeUserList: string[]
  bookmarkUserList: string[]
  imageUrl: string | null
  comments: string[]
}
