import { Link } from 'react-router-dom'
import logo from '../../assets/logo-black.png'

const Navbar = () => {
    return (
        <nav className='flex justify-center items-center w-[90%] mx-auto py-4'>
            <Link to="/">
                <img src={logo} className='h-20' alt="Mantaray Hotels" />
            </Link>
        </nav>
    )
}

export default Navbar