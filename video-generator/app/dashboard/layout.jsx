import React from 'react'
import Header from '../_components/header/page'

const DashboardLayout = ({children}) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  )
}

export default DashboardLayout
