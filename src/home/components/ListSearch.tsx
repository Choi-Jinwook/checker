import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useStoreData } from '@shared/hooks'
import { Marker } from '@shared/types'
import styled from '@emotion/styled'
import { ControlledInput } from '@shared/components'

const ListSearch = ({ seeMine, uid }: Marker) => {
  const [search, setSearch] = useState('')
  const { data: dataArray } = useStoreData()
  const { push } = useRouter()

  const handleSearchWordChange = (value: string) => {
    setSearch(value)
  }

  const handleRouting = (storename: string) => {
    push(`/storeinfo/${storename}`)
  }

  return (
    <>
      <SearchInput
        kind="tertiary"
        shape="basic"
        placeholder="검색어를 입력해주세요(가게명, 설명, 주소(지번))"
        onChange={(value) => handleSearchWordChange(value)}
      />
      <ListContainer>
        {dataArray?.map((el: any) => {
          const isHidden = el.hide
          const storeName = el.storeName
          const uidMatch = uid === el.uid
          const addr = el.addr.includes(search)
          const info = el.storeInfo.includes(search)
          const name = storeName.includes(search)

          if (isHidden && !uidMatch) return null
          if (seeMine && !uidMatch) return null
          if (search !== '' && !addr && !info && !name) return null

          return (
            <StoreName key={el.id} onClick={() => handleRouting(storeName)}>
              {storeName}
            </StoreName>
          )
        })}
      </ListContainer>
    </>
  )
}

export default ListSearch

const SearchInput = styled(ControlledInput)`
  width: 100%;
  max-width: 100%;
  height: 5vh;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 4px;
  text-align: left;
`

const ListContainer = styled.section`
  width: 100vw;
  height: 44vh;
  padding: 4px;
  padding-top: 6px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StoreName = styled.div`
  width: inherit;
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 0.5rem;
`
