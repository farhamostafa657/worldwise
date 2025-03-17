/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
const Base_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${Base_URL}/cities`, {
        method: "Post",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context == undefined)
    throw new Error("useCities was declared outside the CitiescontextProvider");
  return context;
}

export { CitiesContextProvider, useCities };
