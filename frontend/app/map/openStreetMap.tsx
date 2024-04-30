// 参考: https://dev.classmethod.jp/articles/tried-react-leaflet-with-nextjs/
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, {LatLngTuple} from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});
import "leaflet/dist/leaflet.css";

const Map = () => {
  const defaultLatLng: LatLngTuple = [34.686, 135.520];

  return (
    <MapContainer
      center={defaultLatLng}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultLatLng}>
        <Popup>
          ここは大阪中心だよ！
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
