import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../auth/Navbar'

const AuthLayout = () => {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default AuthLayout