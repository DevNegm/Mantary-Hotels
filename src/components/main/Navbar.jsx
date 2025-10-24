import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/reducers/authReducer'
import { useScrollToSection } from '../../utils/Helpers'
import { Menu } from '@mantine/core'
import { BiLogOut, BiUser } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import blacklogo from '../../assets/logo-black.png'
import logo from '../../assets/logo.png'
const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const scrollToSection = useScrollToSection();
  const [toggle, setToggle] = useState(false)
  if (toggle) {
    return (
      <nav className='fixed top-0 left-0 overflow-y-auto w-full h-screen bg-white py-4 px-[5%] flex flex-col gap-4 z-30'>
        <div className='flex items-center justify-between gap-4'>
          <Link to="/" onClick={() => setToggle(false)}>
            <img src={blacklogo} className='h-10' alt="Mantaray Hotels" />
          </Link>
          <button className='lg:hidden block text-black' onClick={() => setToggle(false)}>
            <IoClose size={24} />
          </button>
        </div>
        <Link to='/' onClick={() => setToggle(false)} className='text-sm text-black font-bold'>Home</Link>
        <button onClick={() => { setToggle(false); scrollToSection('about') }} className='text-sm! text-start text-black font-bold!'>About</button>
        <button onClick={() => { setToggle(false); scrollToSection('rooms') }} className='text-sm! text-start text-black font-bold!'>Rooms</button>
        {isAuthenticated ?
          (<div className='flex flex-col gap-4'>
            <Link to='/profile' onClick={() => setToggle(false)} className='text-sm text-black font-bold'>Profile</Link>
            <button className='text-start text-sm! font-bold!' onClick={() => { dispatch(logout()); setToggle(false) }}>Logout</button>
          </div>)
          :
          (<div className='flex flex-col gap-4'>
            <Link to='/auth' onClick={() => setToggle(false)} className='text-sm text-black font-bold'>Login</Link>
            <Link to='/auth/sign-up' onClick={() => setToggle(false)} className='text-sm text-black font-bold'>Signup</Link>
          </div>)}
      </nav>
    )
  }

  return (
    <nav className='w-full fixed left-1/2 -translate-x-1/2 z-20 bg-linear-to-b from-black/95 to-transparent'>
      <div className='flex items-center justify-between gap-4 w-[90%] mx-auto py-4'>
        <Link to="/">
          <img src={logo} className='h-10' alt="Mantaray Hotels" />
        </Link>
        <div className='hidden lg:flex items-center gap-2'>
          <button onClick={() => scrollToSection('home')} className='px-4 py-2 text-sm text-white rounded-full font-bold hover:scale-95 transition-all cursor-pointer'>Home</button>
          <button onClick={() => scrollToSection('about')} className='px-4 py-2 text-sm text-white rounded-full font-bold hover:scale-95 transition-all cursor-pointer'>About</button>
          <button onClick={() => scrollToSection('rooms')} className='px-4 py-2 text-sm text-white rounded-full font-bold hover:scale-95 transition-all cursor-pointer'>Rooms</button>
        </div>
        <div className='hidden lg:block'>
          {isAuthenticated ? (
            <Menu
              transitionProps={{ transition: 'pop' }}
              withArrow
              position="bottom-end"
              withinPortal
              classNames={{
                dropdown: 'bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl p-2',
                item: 'text-zinc-200 hover:bg-zinc-800 hover:text-white rounded-lg px-3 py-2 text-sm transition-all',
              }}
            >
              <Menu.Target>
                <button className='flex items-center justify-center gap-2 text-white cursor-pointer hover:scale-95 transition'>
                  <FaRegUserCircle />
                  {user?.username}
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Link to='/profile'>
                  <Menu.Item leftSection={<BiUser />}>
                    Profile
                  </Menu.Item>
                </Link>
                <Menu.Item leftSection={<BiLogOut />} onClick={() => dispatch(logout())}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/auth' className='px-4 py-2 text-sm text-white rounded-full font-bold hover:scale-95 transition-all cursor-pointer'>Login</Link>
              <Link to='/auth/sign-up' className='px-4 py-2 text-sm text-white rounded-full font-bold hover:scale-95 transition-all cursor-pointer'>Signup</Link>
            </div>
          )}
        </div>
        <button className='lg:hidden block text-white' onClick={() => setToggle(true)}><MdMenu size={24} /></button>
      </div>
    </nav>
  )
}

export default Navbar