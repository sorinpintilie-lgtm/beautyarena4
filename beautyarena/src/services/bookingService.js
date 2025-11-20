import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';

export const createBooking = async (userId, bookingData) => {
  try {
    console.log('Creating booking for user:', userId, 'with data:', bookingData);
    const booking = {
      userId,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'bookings'), booking);
    console.log('Booking created successfully with ID:', docRef.id);
    return { success: true, id: docRef.id, ...booking };
  } catch (error) {
    console.error('Error creating booking:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const bookings = [];

    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, bookings };
  } catch (error) {
    console.error('Error getting bookings:', error);
    return { success: false, error: error.message };
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: error.message };
  }
};