import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // eslint-disable-next-line no-unused-vars
  const [searchParms, setSearchParms] = useSearchParams();
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");
  return { lat, lng };
}
