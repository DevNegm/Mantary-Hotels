import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/Helpers";

export const mainSlice = createSlice({
  name: 'main',
  initialState: loadFromLocalStorage(),
  reducers: {
    bookRoom: (state, action) => {
      const booking = {
        ...action.payload,
        id: `booking_${Date.now()}`,
        bookingDate: new Date().toISOString(),
        status: 'active'
      };
      state.bookedRooms.push(booking);
      saveToLocalStorage('bookedRooms', state.bookedRooms);
    },
    
    cancelReservation: (state, action) => {
      const bookingId = action.payload;
      const bookingIndex = state.bookedRooms.findIndex(b => b.id === bookingId);
      
      if (bookingIndex !== -1) {
        const canceledBooking = {
          ...state.bookedRooms[bookingIndex],
          status: 'canceled',
          canceledDate: new Date().toISOString()
        };
        
        state.canceledReservations.push(canceledBooking);
        state.bookedRooms.splice(bookingIndex, 1);
        
        saveToLocalStorage('bookedRooms', state.bookedRooms);
        saveToLocalStorage('canceledReservations', state.canceledReservations);
      }
    }
  },
})

export const { bookRoom, cancelReservation, clearAllBookings } = mainSlice.actions;
export const mainReducer = mainSlice.reducer;