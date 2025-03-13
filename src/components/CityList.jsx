/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ loading, cities }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        Message="Add
        your
        firdt
        city
        by
        clicking
        on
        the
        city
        on
        the
        map"
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
