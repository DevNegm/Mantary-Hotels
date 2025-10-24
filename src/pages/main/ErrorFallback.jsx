import { Link } from 'react-router-dom'

const ErrorFallback = () => {
  return (
    <section className='min-h-screen flex flex-col gap-4 items-center justify-center'>
        <h3 className='lg:text-4xl text-2xl font-bold text-center'>404 Page not found</h3>
        <Link to='/' className='text-blue-400 text-center'>Go back home</Link>
    </section>
  )
}

export default ErrorFallback