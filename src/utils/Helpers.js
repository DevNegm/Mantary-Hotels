import { useLocation, useNavigate } from "react-router-dom";

export const lazyRetry = (importFn, retries = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    importFn()
      .then(resolve)
      .catch(error => {
        if (retries === 0) return reject(error);
        setTimeout(() => {
          lazyRetry(importFn, retries - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

export const twoPads = (num) => {
  let final = num + 1
  return final.toString().padStart(2, "0")
}

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export function isDateInRange(selectedStart, selectedEnd, checkIn, checkOut) {
  const start = new Date(selectedStart);
  const end = new Date(selectedEnd);
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  return (
    (inDate >= start && inDate <= end) ||
    (outDate >= start && outDate <= end) ||
    (inDate <= start && outDate >= end)
  );
}

export const loadFromLocalStorage = () => {
  try {
    const bookedRooms = localStorage.getItem('bookedRooms');
    const canceledReservations = localStorage.getItem('canceledReservations');

    return {
      bookedRooms: bookedRooms ? JSON.parse(bookedRooms) : [],
      canceledReservations: canceledReservations ? JSON.parse(canceledReservations) : [],
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      bookedRooms: [],
      canceledReservations: [],
    };
  }
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getMaxNights = (item) => {
  if (!item.bookedDates || item.bookedDates.length === 0) return 30;

  const firstRange = item.bookedDates[0];
  const checkIn = new Date(firstRange.checkIn);
  const checkOut = new Date(firstRange.checkOut);
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const executeScroll = () => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname === "/") {
      executeScroll();
    } else {
      navigate("/", { replace: false });
      setTimeout(() => executeScroll(), 300);
    }
  };

  return scrollToSection;
};