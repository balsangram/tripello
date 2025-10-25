import React from 'react'
import Hero from '../componate/home/Hero'
import Featured from '../componate/home/Featured'
import Recommended from '../componate/home/Recommended'
import Work from '../componate/home/Work'
import Explore from '../componate/home/Explore'
import Feedback from '../componate/home/Feedback'
import Suggestion from '../componate/home/Suggestion'

function Index() {
  return (
    <div className='mt-8'>
      <Hero />
      <Featured />
      <Explore />
      <Recommended />
      <Work />

      <Suggestion />


      <Feedback />
    </div>
  )
}

export default Index
