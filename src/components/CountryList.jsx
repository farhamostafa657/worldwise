/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ loading, cities }) {
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

  const countries = cities.reduce((cur, acc) => {
    if (!cur.map((city) => city.country).includes(acc.country)) {
      return [...cur, { country: acc.country, emoji: acc.emoji }];
    } else {
      return cur;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
