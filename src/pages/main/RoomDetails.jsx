import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookRoom } from '../../store/reducers/mainReducer';
import { formatDate, getMaxNights } from '../../utils/Helpers';
import { rooms } from '../../utils/Data';
import { Modal } from '@mantine/core';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';

const RoomDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { bookedRooms } = useSelector(state => state.main);

  const [modalOpened, setModalOpened] = useState(false);
  const [nights, setNights] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const bookedIds = bookedRooms.map((r) => r.roomId);
  const availableRooms = rooms.filter((r) => !bookedIds.includes(r.id));
  const item = availableRooms.find((el) => el.id === parseInt(id));
  const maxNights = getMaxNights(item);
  const totalPrice = item.pricePerNight * nights;

  const handleBookNow = () => {
    if (!item.available || !item.bookedDates || item.bookedDates.length === 0) {
      toast.error('This room is not available at this moment')
      return;
    }

    setSelectedDateRange(item.bookedDates[0]);
    setModalOpened(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDateRange) return;

    const checkIn = new Date(selectedDateRange.checkIn);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);

    const booking = {
      userId: user.id,
      roomId: item.id,
      roomName: item.name,
      roomType: item.type,
      location: item.location,
      pricePerNight: item.pricePerNight,
      nights: nights,
      totalPrice: totalPrice,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      image: item.image,
      amenities: item.amenities,
      capacity: item.capacity,
    };

    dispatch(bookRoom(booking));
    setModalOpened(false);
    setNights(1);
    navigate('/rooms')
    toast.success('Room booked successfully!')
  };
  return (
    <section className='flex flex-col gap-4 py-30 max-w-[1400px] w-[90%] mx-auto'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='flex flex-wrap items-center gap-4'>
          <button onClick={() => navigate(-1)} className='flex items-center gap-2 font-semibold cursor-pointer hover:-translate-x-1 transition'><FaArrowLeft /> Back</button>
          <h3 className='font-bold lg:text-2xl text-lg'>{item.name}</h3>
          <p className='px-4 py-2 rounded-full border border-zinc-500 font-bold lg:text-base text-sm'>{item.location}</p>
        </div>
      </div>
      <img src={item.image} className='w-full h-96 object-cover object-bottom rounded-4xl' alt={item.name} />
      <p className='text-xl text-zinc-500'>{item.description}</p>
      <div className='flex flex-wrap items-center gap-4'>
        <p className='px-4 py-2 rounded-full border border-zinc-500 text-sm font-semibold'>{item.type}</p>
        <p className='px-4 py-2 rounded-full border border-zinc-500 text-sm font-semibold'>Room Capacity: {item.capacity}</p>
        {item.amenities.map((el, idx) => <p key={idx} className='px-4 py-2 rounded-full border border-zinc-500 text-sm font-semibold'>{el}</p>)}
        <div className='flex items-center  lg:ml-auto'>
          <p className='text-xl text-zinc-500'>Price Per Night</p>
          <p className='text-2xl font-bold'>${item.pricePerNight}</p>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleBookNow}
            className='px-8 py-2 border border-black rounded-full bg-black text-white hover:bg-white hover:text-black transition cursor-pointer w-fit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white'
          >
            Book Now
          </button>
        )}
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <p className='text-zinc-500'>{item.available ? 'Available' : 'Not Available'}</p>
        {item.bookedDates.map((d, idx) => (
          <p key={idx} className='text-sm px-4 py-2 rounded-full border border-zinc-500'>From <span className='font-bold'>{formatDate(d.checkIn)}</span>  To <span className='font-bold'>{formatDate(d.checkOut)}</span></p>
        ))}
      </div>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Book Your Room"
        size="xl"
        centered
        classNames={{
          header: 'border-b border-zinc-200 pb-2',
          title: 'text-lg font-semibold text-zinc-700',
          body: 'p-4 bg-white rounded-4xl',
        }}
      >
        <div className='flex flex-col gap-6 '>
          <div className='flex gap-4'>
            <img src={item.image} className='w-32 h-32 object-cover rounded-lg' alt={item.name} />
            <div className='flex flex-col gap-2'>
              <h3 className='font-bold text-xl'>{item.name}</h3>
              <p className='text-sm text-zinc-600'>{item.type}</p>
              <p className='text-sm text-zinc-600'>{item.location}</p>
              <p className='text-sm text-zinc-600'>Capacity: {item.capacity} {item.capacity === 1 ? 'person' : 'people'}</p>
            </div>
          </div>

          <div className='border-t border-t-zinc-200 pt-4'>
            <p className='text-sm text-zinc-600 mb-2'>Amenities:</p>
            <div className='flex flex-wrap gap-2'>
              {item.amenities.map((amenity, idx) => (
                <span key={idx} className='px-3 py-1 bg-zinc-100 rounded-full text-xs'>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className='border-t border-t-zinc-200 pt-4 flex gap-6'>
            <div>
              <p className='font-semibold'>Number of Nights</p>
              <p className='text-sm text-zinc-500'>{`Maximum ${maxNights} nights available`}</p>
            </div>
            <div className='flex items-center gap-4'>
              <button disabled={nights === 0} onClick={() => nights !== 0 && setNights((prev) => prev - 1)} className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'><FaMinus size={12} /></button>
              <span className='font-bold text-lg'>{nights}</span>
              <button disabled={nights === maxNights} onClick={() => nights !== maxNights && setNights((prev) => prev + 1)} className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'><FaPlus size={12} /></button>
            </div>
          </div>

          {selectedDateRange && (
            <div className='bg-zinc-50 p-4 rounded-lg'>
              <p className='text-sm text-zinc-600 mb-2'>Selected Dates:</p>
              <p className='font-semibold'>
                Check-in: {formatDate(selectedDateRange.checkIn)}
              </p>
              <p className='font-semibold'>
                Check-out: {formatDate(new Date(new Date(selectedDateRange.checkIn).getTime() + nights * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
              </p>
            </div>
          )}

          <div className='border-t border-t-zinc-200 pt-4'>
            <div className='flex justify-between items-center mb-2'>
              <p className='text-zinc-600'>${item.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}</p>
              <p className='font-semibold'>${item.pricePerNight * nights}</p>
            </div>
            <div className='flex justify-between items-center text-lg font-bold border-t border-t-zinc-200 pt-2'>
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={() => setModalOpened(false)}
              className='flex-1 px-4 py-2 border border-zinc-300 rounded-full hover:bg-zinc-50 transition'
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              className='flex-1 px-4 py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition'
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default RoomDetails