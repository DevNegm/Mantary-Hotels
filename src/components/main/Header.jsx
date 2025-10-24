import bg from '../../assets/bg.jpg'
const Header = () => {

  return (
    <section id='home' className='flex flex-col h-[70vh] gap-4 justify-center items-center w-full relative'>
        <img src={bg} className='w-full h-full object-cover object-bottom absolute inset-0 -z-1' alt="background" />
        <div className='flex flex-col gap-4 max-w-[760px] w-[90%] m-auto text-center'>
            <h2 className='lg:text-7xl text-2xl text-white font-bold'>
                Where Serenity Meets Luxury
            </h2>
            <p className='text-white text-xl'>Discover a hotel with breathtaking views, world-class <br /> service, and unforgettable experiences</p>
        </div>
    </section>
  )
}

export default Header