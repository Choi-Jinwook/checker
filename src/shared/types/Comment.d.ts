export interface Comment {
  data: any
  comments: {
    comment: string
    writer: string
  }[]
  onClose: () => void
  userData: any
}
