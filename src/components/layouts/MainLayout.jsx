import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../main/Navbar'
import Footer from '../main/Footer'
import { useEffect } from 'react'

const MainLayout = () => {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default MainLayout