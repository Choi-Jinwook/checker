import { Coords } from '@shared/types'
import Image from 'next/image'
import Link from 'next/link'

const StoreInfo = ({ lat, lng, toggleInfo }: Coords) => {
  return (
    <div style={{ minWidth: '150px' }}>
      <Image
        alt="close"
        width="14"
        height="13"
        src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
        style={{
          position: 'absolute',
          right: '5px',
          top: '5px',
          cursor: 'pointer'
        }}
        onClick={toggleInfo}
      />
      <Link
        legacyBehavior
        href={{
          pathname: '/register',
          query: { lat: lat, lng: lng }
        }}
        as="/register"
      >
        <a
          style={{
            color: 'black',
            textDecoration: 'none',
            position: 'absolute',
            top: '3px',
            left: '3px'
          }}
        >
          장소 추가하기
        </a>
      </Link>
    </div>
  )
}

export default StoreInfo
