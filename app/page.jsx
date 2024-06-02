import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Welcome From Home</h1>
      <Link href="/properties">Explore Properties</Link>
    </div>
  )
}

export default Home