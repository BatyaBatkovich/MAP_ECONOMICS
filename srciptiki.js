// Map initialization with deferred rendering
var map = L.map('map', {
    center: [15.4542, 18.7322],
    zoom: 3,
    maxBoundsViscosity: 1.0,
    preferCanvas: true, // Use canvas for rendering (improves performance)
  });
  map.invalidateSize();
  // Adding OpenStreetMap layer with deferred loading
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 256,
    updateWhenIdle: true, // Load tiles only after map movement is complete
    updateWhenZooming: false // Disable tile loading during zoom
  }).addTo(map);
  // Array to store markers
  var markers = [];
  
  // Function to create pulsating marker
  function createPulsingMarker(lat, lng, popupContent, type) {
    var markerHtml = `<div class="marker-container"><div class="pulse-icon ${type}"></div></div>`;
    
    var pulsingIcon = L.divIcon({
      html: markerHtml,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    
    var marker = L.marker([lat, lng], {
      icon: pulsingIcon
    }).addTo(map);
    
    marker.bindPopup(popupContent);
    
    return marker;
  }
  
  const response =  axios.get("https://backend-n8n-lkkb.onrender.com/api/items").then((({data})=>{
    const colors = ['colorYELLOW', 'colorPURPLE' , 'colorDARKBLUE']
    console.log(data.map((item)=>({lat:item.latitude,lng:item.longitude,popup:item.name,color:colors[item.event_type_id-2]})))
    console.log(data)

    const markerData =  data.map((item)=>({lat:item.latitude,lng:item.longitude,popup:`${item.name} <a href="${item.source_url}">⏩</a>`,color:colors[item.event_type_id-2]}))





  // New points
  // var markerData = [
  //   { lat: 50.0, lng: 30.0, popup: 'Kyiv', color: 'colorPURPLE' },
  //   { lat: 31.7683, lng: 35.2137, popup: 'Jerusalem', color: 'colorDARKBLUE' },
  //   { lat: 40.7128, lng: -74.0060, popup: 'New York', color: 'colorBLACK' },
  //   { lat: 35.6895, lng: 139.6917, popup: 'Tokyo', color: 'colorBROWN' },
  //   { lat: 51.5074, lng: -0.1278, popup: 'London', color: 'colorYELLOW' },
  //   { lat: -22.9068, lng: -43.1729, popup: 'Rio de Janeiro', color: 'colorRED' },
  //   { lat: -33.8688, lng: 151.2093, popup: 'Sydney', color: 'colorPURPLE' },
  //   { lat: 48.8566, lng: 2.3522, popup: 'Paris', color: 'colorDARKBLUE' },
  //   { lat: 34.0522, lng: -118.2437, popup: 'Los Angeles', color: 'colorBLACK' },
  //   { lat: 40.7306, lng: -73.9352, popup: 'Boston', color: 'colorBROWN' },
  //   { lat: 55.7558, lng: 37.6173, popup: 'Moscow', color: 'colorYELLOW' },
  //   { lat: 34.0522, lng: 118.2437, popup: 'San Francisco', color: 'colorRED' },
  //   { lat: 52.52, lng: 13.405, popup: 'Berlin', color: 'colorPURPLE' },
  //   { lat: 39.9042, lng: 116.4074, popup: 'Beijing', color: 'colorDARKBLUE' },
  //   { lat: 41.9028, lng: 12.4964, popup: 'Rome', color: 'colorBLACK' },
  //   { lat: 55.6761, lng: 12.5683, popup: 'Copenhagen', color: 'colorBROWN' },
  //   { lat: 37.7749, lng: -122.4194, popup: 'San Francisco', color: 'colorYELLOW' },
  //   { lat: -34.6037, lng: -58.3816, popup: 'Buenos Aires', color: 'colorRED' },
  //   { lat: 19.4326, lng: -99.1332, popup: 'Mexico City', color: 'colorPURPLE' },
  //   { lat: 1.3521, lng: 103.8198, popup: 'Singapore', color: 'colorDARKBLUE' },
  //   { lat: 39.9334, lng: 32.8597, popup: 'Ankara', color: 'colorBLACK' },
  //   { lat: 45.4215, lng: -75.6992, popup: 'Ottawa', color: 'colorBROWN' },
  //   { lat: -34.9285, lng: 138.6007, popup: 'Adelaide', color: 'colorYELLOW' },
  //   { lat: 35.6762, lng: 139.6503, popup: 'Yokohama', color: 'colorRED' }
  // ];
  
  // Adding markers and storing them in the array
  markerData.forEach(function(m) {
    var newMarker = createPulsingMarker(m.lat, m.lng, m.popup, m.color);
    markers.push({ marker: newMarker, color: m.color });
  });
  
  function pan(x, y) {
    map.panBy([x, y]); // Moves the map by x and y pixels
  }
  
  // Performance optimization during zooming
  map.on('zoomend', function() {
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        layer._icon.style.transition = 'transform 0.3s';
      }
    });
  });
  
  // Marker filtering function
  function filterMarkers(color) {
    markers.forEach(function(item) {
      if (color === 'all' || item.color === color) {
        item.marker.addTo(map); // Show marker
      } else {
        map.removeLayer(item.marker); // Hide marker
      }
    });
  }
  
  // Apply filter when dropdown value changes
  document.getElementById('filter').addEventListener('change', function(e) {
    var selectedColor = e.target.value;
    filterMarkers(selectedColor);
  });

}))