import { useEffect, useRef } from 'react';

const PropertyMap = ({ latitude, longitude, address, title, className = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        // Google Maps doesn't need explicit cleanup
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  const initializeMap = () => {
    if (!latitude || !longitude || !mapRef.current) return;

    const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    // Create map
    const map = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    mapInstanceRef.current = map;

    // Create marker
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      title: title,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#0D9488" stroke="#ffffff" stroke-width="2"/>
            <path d="M16 8L20 16L16 24L12 16L16 8Z" fill="#ffffff"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
      }
    });

    markerRef.current = marker;

    // Create info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #0D9488;">${title}</h3>
          <p style="margin: 0; font-size: 14px; color: #666;">${address}</p>
        </div>
      `
    });

    // Add click listener to marker
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  };

  if (!latitude || !longitude) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ height: '300px' }}>
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">Location not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full" 
        style={{ height: '300px' }}
      />
    </div>
  );
};

export default PropertyMap; 