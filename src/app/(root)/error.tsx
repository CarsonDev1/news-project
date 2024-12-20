'use client' // Error components must be Client Components

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="empty not-found ">
      <div className="container">
        <div className="not-found-wr">
          <div className="img-inner">
            <Image src={'/assets/images/500-err.png'} alt="500 error" width={500} height={500}></Image>
          </div>
          {/* <Title variants="h1" className="empty-title">
            Đã có lỗi xảy ra
          </Title> */}
          <Link href="/" className="btn --four">
            <span>Trở về trang chủ </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
