import { useMutation } from 'react-query'
import { fetchLikes } from '@shared/apis'
import { TypeOptions, toast } from 'react-toastify'

export const useLike = () => {
  return useMutation(
    async ({
      id,
      uid,
      likes
    }: {
      id: string
      uid: string[]
      likes: number
    }) => {
      await fetchLikes(id, uid, likes)
    }
  )
}

export const useToast = () => {
  const showToast = (message: string, type: TypeOptions | undefined) => {
    return toast(message, {
      hideProgressBar: true,
      autoClose: 1000,
      type: type,
      position: 'bottom-center'
    })
  }

  return { showToast }
}
