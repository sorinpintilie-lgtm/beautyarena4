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
    console.log('Getting bookings for user:', userId);

    // First try with the ordered query
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

      console.log('Found bookings with ordered query:', bookings.length);
      return { success: true, bookings };
    } catch (orderedError) {
      console.warn('Ordered query failed, trying simple query:', orderedError.message);

      // Fallback to simple query without ordering
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      const bookings = [];

      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });

      // Sort manually since we can't use orderBy
      bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      console.log('Found bookings with simple query:', bookings.length);
      return { success: true, bookings };
    }
  } catch (error) {
    console.error('Error getting bookings:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    console.log('Cancelling booking:', bookingId);

    // First get the booking to check if it has a calendar event ID and send cancellation email
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.exists()) {
      const bookingData = bookingSnap.data();

      // Send cancellation email
      try {
        await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'booking_cancellation',
            data: bookingData
          })
        });
      } catch (emailError) {
        console.warn('Cancellation email failed:', emailError);
        // Don't fail cancellation if email fails
      }

      // If there's a calendar event ID, try to remove it from Google Calendar
      if (bookingData.calendarEventId) {
        try {
          console.log('Removing calendar event:', bookingData.calendarEventId);
          // Note: This would require a new Netlify function to delete calendar events
          // For now, we'll just log it - you may need to manually remove from calendar
          // or implement a delete-calendar-event Netlify function
          console.warn('Calendar event removal not implemented yet. Event ID:', bookingData.calendarEventId);
        } catch (calendarError) {
          console.warn('Error removing calendar event:', calendarError);
          // Don't fail the cancellation if calendar removal fails
        }
      }
    }

    // Completely delete the booking from Firebase
    await deleteDoc(bookingRef);
    console.log('Booking deleted from Firebase:', bookingId);

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