// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const { createCity, isLoading } = useCities();
  const { lat, lng } = useUrlPosition();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [errorPosition, setErrorPosition] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (!lat && lng) return;
    async function fetchCityName() {
      try {
        setLoadingPosition(true);
        setErrorPosition("");
        const res = await fetch(`${Base_Url}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) throw new Error("please select a right city 🙄");
        setCityName(data.city || data.countryName || data.locality);
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        setErrorPosition(error.message);
      } finally {
        setLoadingPosition(false);
      }
    }
    fetchCityName();
  }, [lat, lng]);

  async function handleSubmet(e) {
    e.preventDefault();

    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (errorPosition) return <Message message={errorPosition} />;

  if (!lat && !lng)
    return <Message message={"start by click in someware in the map"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""} `}
      onSubmit={handleSubmet}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">
          When did you go to {loadingPosition ? "looding" : cityName}?
        </label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyy"}
        />
        ;
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
