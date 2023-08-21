import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { Routing } from "./RoutingControl";
//@ts-ignore

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = ({
  coordinates,
  currentLocation,
  destinationIcon,
  otherIcon
}: {
  coordinates: { start?: number[]; end?: number[] };
  destinationIcon: any;
  otherIcon: any;
  currentLocation: any;
}) => {
  return (
    <>
      <MapContainer
        //@ts-ignore
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
      >
        {coordinates?.end && currentLocation && (
          <Routing
            start={[currentLocation?.lat, currentLocation?.lng]}
            destination={coordinates.end}
            destinationIcon={destinationIcon}
          />
        )}

        {coordinates?.start && (
          //@ts-ignore
          <Marker position={coordinates.start} icon={otherIcon} />
        )}
        <LayersControl
          //@ts-ignore
          position="topright"
        >
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              //@ts-ignore
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;
