//@ts-ignore
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const Routing = ({ start, destination, destinationIcon }: any) => {
  const map = useMap();

  const ambulance = L.icon({
    iconUrl: "/ambulance.svg",
    iconSize: [30, 30]
  });

  useEffect(() => {
    if (!map) return;

    const routingControl = L?.Routing?.control({
      waypoints: [L.latLng(start), L.latLng(destination)],
      draggableWaypoints: false,
      addWaypoints: false,
      createMarker: function (i: any, start: any, n: any) {
        var marker_icon = null;
        if (i == 0) {
          marker_icon = ambulance;
        } else if (i == n - 1) {
          marker_icon = destinationIcon;
        }
        var marker = L.marker(start.latLng, {
          draggable: false,
          bounceOnAdd: false,
          bounceOnAddOptions: {
            duration: 1000,
            height: 800
          },
          icon: marker_icon
        });
        return marker;
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, JSON.stringify(destination)]);

  return null;
};
