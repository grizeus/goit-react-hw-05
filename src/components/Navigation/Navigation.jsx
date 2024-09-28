import { NavLink, useLocation } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = ({children}) => {
  
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";
  console.log(location.state);
  return (
    <header className={styles.header}>
      <nav className={styles.navs}>
        <ul>
          {location.pathname !== "/" && location.pathname !== "/movies" && (
            <li>
              <NavLink className={styles.link} to={backLinkHref}>
                Back
              </NavLink>
            </li>
          )}
          <li>
            <NavLink className={styles.link} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/movies">
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
