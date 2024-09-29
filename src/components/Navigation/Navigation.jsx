import { useLocation, NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./Navigation.module.css";

const Navigation = ({ children }) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={styles.navs}>
        <ul>
          <li>
            <NavLink
              className={clsx(
                styles.link,
                location.pathname === "/" && styles.active
              )}
              to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={clsx(
                styles.link,
                location.pathname === "/movies" && styles.active
              )}
              to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      {children}
    </header>
  );
};

export default Navigation;
