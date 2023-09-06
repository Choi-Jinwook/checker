import { authService, dbService } from '@shared/firebase'
import { UserObj } from '@shared/types'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'

export const fetchStoreData = async () => {
  const q = query(collection(dbService, 'mystore'))
  const querySnapshot = await getDocs(q)
  const dataArray: any[] = []
  querySnapshot.forEach((doc: any) => {
    const data = doc.data()
    dataArray.push({
      ...data,
      id: doc._key.path.segments[6],
      combinedTimestamp:
        doc._document.createTime.timestamp.seconds * 1000 +
        doc._document.createTime.timestamp.nanoseconds / 1000000
    })
  })
  dataArray.sort((a, b) => b.combinedTimestamp - a.combinedTimestamp)
  return dataArray
}

export const fetchLikes = async (id: string, uid: string[], likes: number) => {
  await updateDoc(doc(dbService, 'mystore', `${id}`), {
    likeUserList: uid,
    likes: likes
  })
}

export const fetchUserData = async () => {
  return new Promise<UserObj | null>((resolve) => {
    authService.onAuthStateChanged((user: any) => {
      if (user) {
        let userData
        if (user.displayName === null) {
          const name = user.email.split('@')[0]
          user.displayName = name
        }
        userData = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () =>
            user.updateProfile(user, { displayName: user.displayName })
        }
        resolve(userData)
      } else {
        resolve(null)
      }
    })
  })
}
