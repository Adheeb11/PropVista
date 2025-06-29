import { useEffect, useRef, useState } from 'react';

const MapPicker = ({ 
  latitude, 
  longitude, 
  address, 
  onLocationChange, 
  className = "",
  height = "400px" 
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(address || '');
  const [isLoading, setIsLoading] = useState(false);

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
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Default center (can be set to a default location)
    const defaultCenter = latitude && longitude 
      ? { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      : { lat: 20.5937, lng: 78.9629 }; // Center of India

    // Create map
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add click listener to map
    map.addListener('click', (event) => {
      const position = event.latLng;
      updateMarker(position);
      reverseGeocode(position);
    });

    // Initialize marker if coordinates exist
    if (latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      updateMarker(position);
    }
  };

  const updateMarker = (position) => {
    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Create new marker
    const marker = new window.google.maps.Marker({
      position: position,
      map: mapInstanceRef.current,
      draggable: true,
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

    // Add drag listener
    marker.addListener('dragend', (event) => {
      const position = event.latLng;
      reverseGeocode(position);
    });

    // Update coordinates
    onLocationChange({
      latitude: position.lat(),
      longitude: position.lng()
    });
  };

  const reverseGeocode = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;
        let streetNumber = '';
        let route = '';
        let locality = '';
        let city = '';
        let state = '';

        addressComponents.forEach(component => {
          const types = component.types;
          if (types.includes('street_number')) {
            streetNumber = component.long_name;
          } else if (types.includes('route')) {
            route = component.long_name;
          } else if (types.includes('locality')) {
            locality = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            state = component.long_name;
          } else if (types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
        });

        const fullAddress = [streetNumber, route, locality].filter(Boolean).join(' ');
        setSearchQuery(fullAddress || results[0].formatted_address);

        onLocationChange({
          latitude: position.lat(),
          longitude: position.lng(),
          address: fullAddress,
          area: locality,
          city: city || state
        });
      }
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    setIsLoading(true);
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      setIsLoading(false);
      
      if (status === 'OK' && results[0]) {
        const position = results[0].geometry.location;
        mapInstanceRef.current.setCenter(position);
        mapInstanceRef.current.setZoom(15);
        updateMarker(position);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        mapInstanceRef.current.setCenter(pos);
        mapInstanceRef.current.setZoom(15);
        updateMarker(pos);
      },
      () => {
        setIsLoading(false);
        alert('Unable to get your current location.');
      }
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <button
          onClick={handleCurrentLocation}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          title="Use current location"
        >
          📍
        </button>
      </div>

      {/* Map Container */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div 
          ref={mapRef} 
          className="w-full" 
          style={{ height }}
        />
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium mb-1">📍 How to set location:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click anywhere on the map to place a marker</li>
          <li>Drag the marker to adjust the exact location</li>
          <li>Use the search bar to find a specific address</li>
          <li>Click the 📍 button to use your current location</li>
        </ul>
      </div>
    </div>
  );
};

export default MapPicker; 