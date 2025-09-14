maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: "map", // must match your <div id="map">
  style: maptilersdk.MapStyle.SATELLITE,
  center: campground.geometry.coordinates,
  zoom: 14,
});
const marker = new maptilersdk.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
  )
  .addTo(map);
