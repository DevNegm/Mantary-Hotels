import { Link } from 'react-router-dom'
import { twoPads } from '../../utils/Helpers'

const Card = ({ item, index }) => {
    return (
        <Link to={`/room/${item.id}`} className='flex flex-col gap-4 p-6 rounded-4xl border border-zinc-200 hover:scale-95 transition-all'>
            <div className='flex items-center justify-between w-full'>
                <p className='text-xl font-semibold'>{twoPads(index)}</p>
                <p className='px-4 py-2 text-xs border border-zinc-200 font-semibold rounded-full'>{item.location}</p>
            </div>
            <img className='w-full rounded-4xl' src={item.image} alt={item.name} />
            <h3 className='font-bold'>{item.name}</h3>
            <p className='text-base text-zinc-500'>{item.description}</p>
            <div className='flex items-center gap-2'>
                <p className='text-sm text-zinc-500'>{item.available ? 'Available' : 'Not Availabale'}</p>
            </div>
        </Link>
    )
}

export default Card