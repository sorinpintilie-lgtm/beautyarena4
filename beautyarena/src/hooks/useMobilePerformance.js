import { useState, useEffect } from 'react';

export const useMobilePerformance = () => {
  const [connection, setConnection] = useState({
    effectiveType: '4g', // 'slow-2g', '2g', '3g', '4g'
    downlink: 10,
    rtt: 50,
    saveData: false
  });

  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    // Detect network connection
    const checkConnection = () => {
      if ('connection' in navigator) {
        setConnection({
          effectiveType: navigator.connection.effectiveType || '4g',
          downlink: navigator.connection.downlink || 10,
          rtt: navigator.connection.rtt || 50,
          saveData: navigator.connection.saveData || false
        });
      }
    };

    // Detect orientation
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    checkMobile();
    checkConnection();
    checkOrientation();

    // Listen for changes
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', checkConnection);
    }

    window.addEventListener('resize', () => {
      checkMobile();
      checkOrientation();
    });

    return () => {
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', checkConnection);
      }
      window.removeEventListener('resize', () => {
        checkMobile();
        checkOrientation();
      });
    };
  }, []);

  // Performance settings based on connection
  const getPerformanceSettings = () => {
    const { effectiveType, saveData } = connection;
    
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return {
        imageQuality: 'low',
        animationDuration: 200,
        lazyLoadOffset: 100,
        debounceMs: 500,
        maxImageSize: 200
      };
    } else if (effectiveType === '3g') {
      return {
        imageQuality: 'medium',
        animationDuration: 300,
        lazyLoadOffset: 50,
        debounceMs: 300,
        maxImageSize: 400
      };
    } else {
      return {
        imageQuality: 'high',
        animationDuration: 300,
        lazyLoadOffset: 0,
        debounceMs: 100,
        maxImageSize: 800
      };
    }
  };

  return {
    isMobile,
    orientation,
    connection,
    performanceSettings: getPerformanceSettings()
  };
};

// Mobile device detection hook
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    os: 'unknown',
    browser: 'unknown'
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    let isTablet = /iPad|Android(?=.*Tablet)|Tab/i.test(userAgent);
    let isDesktop = !isMobile && !isTablet;

    // Detect OS
    let os = 'unknown';
    if (/Windows NT/i.test(userAgent)) os = 'windows';
    else if (/Mac OS X/i.test(userAgent)) os = 'macos';
    else if (/Android/i.test(userAgent)) os = 'android';
    else if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'ios';

    // Detect Browser
    let browser = 'unknown';
    if (/Chrome/i.test(userAgent)) browser = 'chrome';
    else if (/Firefox/i.test(userAgent)) browser = 'firefox';
    else if (/Safari/i.test(userAgent)) browser = 'safari';
    else if (/Edge/i.test(userAgent)) browser = 'edge';

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      os,
      browser
    });
  }, []);

  return deviceInfo;
};