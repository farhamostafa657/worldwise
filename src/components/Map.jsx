import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [searchParms, setSearchParms] = useSearchParams();
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");

  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        position : {lat},{lng}
      </h1>

      <button onClick={() => setSearchParms({ lat: 23, lng: 50 })}>
        change pos
      </button>
    </div>
  );
}

export default Map;
