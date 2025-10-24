import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { rooms } from '../../utils/Data'
import Card from '../ui/Card'

const Rooms = () => {
    const { bookedRooms } = useSelector(state => state.main);
    const bookedIds = bookedRooms.map((r) => r.roomId);
    const availableRooms = rooms.filter((r) => !bookedIds.includes(r.id));
    return (
        <section id='rooms' className='flex flex-col gap-10 justify-center items-center py-20 max-w-[1400px] w-[90%] mx-auto'>
            <div className='flex items-center justify-between w-[90%]'>
                <h3 className='text-3xl font-bold text-black'>
                    Rooms
                </h3>
                <Link to='/rooms' className='text-sm font-bold'>View All</Link>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
                {availableRooms.slice(0, 4).map((item, index) => (
                    <Card key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}

export default Rooms