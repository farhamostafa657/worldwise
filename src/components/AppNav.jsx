import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav>
      <p className={styles.nav}>
        <ul>
          <li>
            <NavLink to={"cities"}>Cities</NavLink>
          </li>
          <li>
            <NavLink to={"countries"}>Countries</NavLink>
          </li>
        </ul>
      </p>
    </nav>
  );
}

export default AppNav;
