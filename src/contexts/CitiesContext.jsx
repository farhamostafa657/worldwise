/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
const Base_URL = "http://localhost:9000";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    case "delete/loaded":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id != action.payload),
      };
    default:
      throw new Error("Unkwon state");
  }
}

function CitiesContextProvider({ children }) {
  const [{ cities, loading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `there was an error wile fetching the cities ${error}`,
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `there was an error wile get the city ${error}`,
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}/cities`, {
        method: "Post",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `there was an error wile create the city ${error}`,
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "Delete",
      });
      dispatch({ type: "delete/loaded", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `there was an error wile delete the city ${error}`,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
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
