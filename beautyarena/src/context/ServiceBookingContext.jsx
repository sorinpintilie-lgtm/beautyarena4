import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const ServiceBookingContext = createContext();

export const useServiceBooking = () => {
  const context = useContext(ServiceBookingContext);
  if (!context) {
    throw new Error('useServiceBooking must be used within a ServiceBookingProvider');
  }
  return context;
};

export const ServiceBookingProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useLocalStorage(
    'beautyarena-service-booking',
    []
  );

  const addService = (service) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.key === service.key)) {
        toast.success('Serviciu deja adăugat în programare');
        return prev;
      }
      toast.success('Serviciu adăugat la programare');
      return [...prev, service];
    });
  };

  const removeService = (key) => {
    setSelectedServices((prev) => prev.filter((s) => s.key !== key));
    toast.success('Serviciu eliminat din programare');
  };

  const clearServices = () => {
    setSelectedServices([]);
    toast.success('Serviciile au fost eliminate din programare');
  };

  const isSelected = (key) => selectedServices.some((s) => s.key === key);

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + (s.price || 0),
    0
  );

  const value = {
    selectedServices,
    addService,
    removeService,
    clearServices,
    isSelected,
    totalPrice,
  };

  return (
    <ServiceBookingContext.Provider value={value}>
      {children}
    </ServiceBookingContext.Provider>
  );
};

export default ServiceBookingContext;