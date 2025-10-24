import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelReservation } from '../../store/reducers/mainReducer';
import { formatDate } from '../../utils/Helpers';
import toast from 'react-hot-toast';
import { Table, Modal } from '@mantine/core';

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);
  const { bookedRooms, canceledReservations } = useSelector(state => state.main);

  const [current, setCurrent] = useState(1)
  const [currentId, setCurrentId] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)

  const currentBookedRooms = bookedRooms.filter((r) => r.userId === user.id)
  const currentCanceledReservations = canceledReservations.filter((r) => r.userId === user.id)

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelReservation(bookingId))
    setModalOpened(false); setCurrentId(null)
    toast.success('Cancelled reservation successfully!')
  };

  return (
    <section className='max-w-[1400px] w-[90%] py-20 mx-auto flex flex-col gap-6 min-h-screen'>
      <img className='w-full h-[250px] object-cover rounded-4xl' src="https://picsum.photos/seed/1/1024/764" alt="profile" />
      <div className='flex flex-col gap-4 '>
        <p className='text-center font-bold'>Hello, {user.username}</p>
        <div className='flex items-center overflow-x-auto border-b border-b-zinc-300'>
          <button onClick={() => setCurrent(1)} className={`p-4 cursor-pointer min-w-max ${current === 1 && 'border-b'}`}>My Reservations</button>
          <button onClick={() => setCurrent(2)} className={`p-4 cursor-pointer min-w-max ${current === 2 && 'border-b'}`}>Cancelled Reservations</button>
        </div>
        <div className='overflow-x-auto'>
          <div className='min-w-[1400px]'>
            {current === 1 && (<Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Room</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Room Type</Table.Th>
                  <Table.Th>Nights</Table.Th>
                  <Table.Th>Price Per Night</Table.Th>
                  <Table.Th>Total Price</Table.Th>
                  <Table.Th>Check In</Table.Th>
                  <Table.Th>Check Out</Table.Th>
                  <Table.Th>Booking Date</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              {currentBookedRooms.length > 0 && (<Table.Tbody>
                {currentBookedRooms.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div className='flex items-center gap-2'>
                        <img src={item.image} alt={item.name} className='w-11 h-11 object-cover rounded-full' />
                        <p>{item.roomName}</p>
                      </div>
                    </Table.Td>
                    <Table.Td>{item.location}</Table.Td>
                    <Table.Td>{item.roomType}</Table.Td>
                    <Table.Td>Booked for {item.nights} nights</Table.Td>
                    <Table.Td>${item.pricePerNight}</Table.Td>
                    <Table.Td>${item.totalPrice}</Table.Td>
                    <Table.Td>{formatDate(item.checkIn)}</Table.Td>
                    <Table.Td>{formatDate(item.checkOut)}</Table.Td>
                    <Table.Td>{formatDate(item.bookingDate)}</Table.Td>
                    <Table.Td>
                      <button onClick={() => { setModalOpened(true); setCurrentId(item.id) }} className='px-4 py-2 rounded-full bg-black text-white cursor-pointer hover:scale-95 transition'>Cancel Reservation</button>

                    </Table.Td>
                  </Table.Tr>))}
              </Table.Tbody>)}
            </Table>)}
            {current === 2 && (<Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Room</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Room Type</Table.Th>
                  <Table.Th>Nights</Table.Th>
                  <Table.Th>Price Per Night</Table.Th>
                  <Table.Th>Total Price</Table.Th>
                  <Table.Th>Check In</Table.Th>
                  <Table.Th>Check Out</Table.Th>
                  <Table.Th>Booking Date</Table.Th>
                </Table.Tr>
              </Table.Thead>

              {currentCanceledReservations.length > 0 && (<Table.Tbody>
                {currentCanceledReservations.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div className='flex items-center gap-2'>
                        <img src={item.image} alt={item.name} className='w-11 h-11 object-cover rounded-full' />
                        <p>{item.roomName}</p>
                      </div>
                    </Table.Td>
                    <Table.Td>{item.location}</Table.Td>
                    <Table.Td>{item.roomType}</Table.Td>
                    <Table.Td>Booked for {item.nights} nights</Table.Td>
                    <Table.Td>${item.pricePerNight}</Table.Td>
                    <Table.Td>${item.totalPrice}</Table.Td>
                    <Table.Td>{formatDate(item.checkIn)}</Table.Td>
                    <Table.Td>{formatDate(item.checkOut)}</Table.Td>
                    <Table.Td>{formatDate(item.bookingDate)}</Table.Td>

                  </Table.Tr>))}
              </Table.Tbody>)}
            </Table>)}
            {current === 1 && currentBookedRooms.length === 0 && (<p className='text-zinc-500 text-center w-full py-20'>No Data Available</p>)}
            {current === 2 && currentCanceledReservations.length === 0 && (<p className='text-zinc-500 text-center w-full py-20'>No Data Available</p>)}
          </div>
        </div>
      </div>
      <Modal
        opened={modalOpened}
        onClose={() => { setModalOpened(false); setCurrentId(null) }}
        size="md"
        centered
      >
        <div className='flex flex-col gap-6 '>
          <h3 className='font-bold'>Are you sure you want to cancel this reservation?</h3>
          <div className='flex gap-3'>
            <button
              onClick={() => { setModalOpened(false); setCurrentId(null) }}
              className='flex-1 px-4 py-2 border border-zinc-300 rounded-full hover:bg-zinc-50 transition cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={() => handleCancelBooking(currentId)}
              className='flex-1 px-4 py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition cursor-pointer'
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default Profile