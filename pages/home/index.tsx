import { Main } from '@home/components'
import { fetchStoreData, fetchUserData } from '@shared/apis'
import { QueryClient, dehydrate } from 'react-query'

const Home = () => {
  return <Main />
}

export default Home

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('data', () => fetchStoreData())
  await queryClient.prefetchQuery('user', () => fetchUserData())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
