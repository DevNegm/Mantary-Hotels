import { Link } from 'react-router-dom'
import { twoPads } from '../../utils/Helpers'

const Card = ({ item, index }) => {
    return (
        <Link to={`/room/${item.id}`} className='flex flex-col gap-2 p-6 rounded-4xl border border-zinc-200 hover:scale-95 transition-all'>
            <div className='flex items-center justify-between w-full'>
                <p className='text-xl font-semibold'>{twoPads(index)}</p>
                <p className='px-4 py-2 text-xs border border-zinc-200 font-semibold rounded-full'>{item.location}</p>
            </div>
            <img className='w-full rounded-4xl' src={item.image} alt={item.name} />
            <h3 className='font-bold'>{item.name}</h3>
            <p className='text-sm text-zinc-500'>{item.description?.slice(0,35)}..</p>
            <div className='flex items-center gap-2'>
            <p className='text-sm'>Price <span className='font-bold'>${item.pricePerNight}</span> Per Night</p>
                <p className={`text-xs ${item.available ? 'text-green-600' : 'text-red-400'}`}>{item.available ? 'Available' : 'Not Availabale'}</p>
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
                {item.amenities.map((el,idx) => <span className='px-2 py-0.5 text-xs border border-zinc-400 rounded-full' key={idx}>{el}</span>)}
            </div>
            
        </Link>
    )
}

export default Card