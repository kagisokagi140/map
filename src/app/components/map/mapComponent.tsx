const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX;
mapboxgl.accessToken 


const origin = [-26.1076, 28.05657];
const destination = [-26.3650, 28.1228];

const apiUrl=  `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints.join(
    ";"
  )}?access_token=${mapboxgl.accessToken}`

fetch(apiUrl)
 .then(response => response.json())
 .then(data => {

    const route = data.route[0];
    const distance = route.distance;
    const duration = route.duration;
    const geometry = route.geometry;

    renderRoute(geometry)
 })

 .catch(error => console.error("Error fetching directions:" , error))

function renderRoute (geometry){

}