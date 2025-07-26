import React from 'react'
import { Outlet } from 'react-router-dom'

export function Home() {
  return (
   <div>
     <div>Home</div>
     <Outlet></Outlet>
   </div>
  )
}

