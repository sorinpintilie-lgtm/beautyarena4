import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';

export const createOrder = async (userId, orderData) => {
  try {
    console.log('Creating order for user:', userId, 'with data:', orderData);

    // Generate order number
    const orderNumber = `BA-${Date.now()}`;

    const order = {
      userId,
      orderNumber,
      ...orderData,
      status: 'pending', // pending, confirmed, shipped, delivered
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'orders'), order);
    console.log('Order created successfully with ID:', docRef.id);

    return { success: true, id: docRef.id, ...order };
  } catch (error) {
    console.error('Error creating order:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const getUserOrders = async (userId) => {
  try {
    console.log('Getting orders for user:', userId);
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    console.log('Found orders:', orders.length);
    return { success: true, orders };
  } catch (error) {
    console.error('Error getting orders:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
};