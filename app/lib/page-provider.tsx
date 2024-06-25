'use client'

import { createContext, useContext } from 'react'

const PageContext = createContext('')

const usePage = () => {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return context
}

const PageProvider = ({ children, path = '' }:{children:React.ReactNode, path:string}) => {
  return <PageContext.Provider value={path}>{children}</PageContext.Provider>
}

export { PageProvider, usePage }
