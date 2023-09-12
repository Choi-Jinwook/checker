import React from 'react'
import { useState } from 'react'
import KakaoMap from './KaKaoMap'
import ListSearch from './ListSearch'
import { HomeHeader } from '@shared/components/layout'
import { useQuery } from 'react-query'
import { fetchStoreData, fetchUserData } from '@shared/apis'

export default function Main() {
  const [seeMine, setSeeMine] = useState<boolean>(true)
  const {
    data: userData,
    isLoading,
    isError
  } = useQuery('user', () => fetchUserData())
  const { data: placeData } = useQuery('data', () => fetchStoreData())

  const toggleSeeMine = () => {
    setSeeMine((prev) => !prev)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error occured</div>

  return (
    <>
      <HomeHeader seeMine={seeMine} toggleSeeMine={toggleSeeMine} />
      {placeData && (
        <KakaoMap data={placeData} seeMine={seeMine} uid={userData?.uid} />
      )}
      {userData && placeData && (
        <ListSearch data={placeData} seeMine={seeMine} uid={userData.uid} />
      )}
    </>
  )
}
