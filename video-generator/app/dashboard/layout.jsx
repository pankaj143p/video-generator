import React from 'react'
import Header from '../_components/header'
import RightSideBar from '../_components/rightsidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className=''>
       <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-64'>
       {/* side bar for right side */}
        <RightSideBar/>
       </div>
       {/* header */}
       <div>
      <Header/>
      <div className='md:ml-64'>
      {children}
      </div>
      </div>
    </div>
  )
}

export default DashboardLayout
